import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { query } from "../config/db.js";
import { validate } from "../middleware/validate.js";
import { authenticate } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../config/mail.js";

const router = express.Router();

function createToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "8h" });
}

router.post(
  "/register",
  [
    body("businessName").notEmpty(),
    body("taxId").notEmpty(),
    body("contactName").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
    body("country").notEmpty(),
    body("preferredLanguage").isIn(["it", "es", "en"]),
    body("password").isLength({ min: 8 }),
    body("confirmPassword").custom((value, { req }) => value === req.body.password),
    body("privacyAccepted").custom((value) => value === true || value === "true"),
    body("termsAccepted").custom((value) => value === true || value === "true")
  ],
  validate,
  asyncHandler(async (req, res) => {
    const client = await query("select id from users where email = $1", [req.body.email]);
    if (client.rows.length) return res.status(409).json({ message: "Email already registered" });

    const role = await query("select id from roles where name = 'customer'");
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const user = await query(
      `insert into users (email, password_hash, role_id, status, preferred_language)
       values ($1, $2, $3, 'pending', $4)
       returning id, email, status`,
      [req.body.email, passwordHash, role.rows[0].id, req.body.preferredLanguage]
    );

    await query(
      `insert into customers (user_id, business_name, tax_id, contact_name, phone, country, preferred_language, privacy_accepted, terms_accepted)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        user.rows[0].id,
        req.body.businessName,
        req.body.taxId,
        req.body.contactName,
        req.body.phone,
        req.body.country,
        req.body.preferredLanguage,
        true,
        true
      ]
    );

    await sendMail({
      to: req.body.email,
      subject: "Registrazione ricevuta",
      text: "Il tuo account e in attesa di approvazione amministratore."
    });

    res.status(201).json({ message: "Registration pending approval", user: user.rows[0] });
  })
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select u.id, u.email, u.password_hash, u.status, r.name as role_name
       from users u join roles r on r.id = u.role_id
       where u.email = $1`,
      [req.body.email]
    );
    const user = rows[0];
    const valid = user ? await bcrypt.compare(req.body.password, user.password_hash) : false;

    await query(
      "insert into login_logs (user_id, email, ip_address, user_agent, success) values ($1,$2,$3,$4,$5)",
      [user?.id || null, req.body.email, req.ip, req.get("user-agent"), valid]
    );

    if (!valid) return res.status(401).json({ message: "Invalid credentials" });
    if (user.status !== "active") return res.status(403).json({ message: "Account pending approval or disabled" });

    const token = createToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 8 * 60 * 60 * 1000
    });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role_name } });
  })
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.post(
  "/password-recovery",
  [body("email").isEmail()],
  validate,
  asyncHandler(async (req, res) => {
    await sendMail({
      to: req.body.email,
      subject: "Recupero password",
      text: "Contatta l'amministratore o configura un flusso con token temporaneo per completare il recupero password."
    });
    res.json({ message: "Recovery instructions sent if the email exists" });
  })
);

router.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    res.json({ user: req.user });
  })
);

export default router;
