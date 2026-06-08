import express from "express";
import { body, param } from "express-validator";
import { query } from "../config/db.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get(
  "/service-pages/:lang",
  [param("lang").isIn(["it", "es", "en"])],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      "select slug, title, summary, body, features from service_pages where language = $1 and is_published = true order by sort_order",
      [req.params.lang]
    );
    res.json({ servicePages: rows });
  })
);

router.get(
  "/news/:lang",
  [param("lang").isIn(["it", "es", "en"])],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select id, slug, title, excerpt, category, published_at, show_on_home
       from news where language = $1 and status = 'published'
       order by published_at desc`,
      [req.params.lang]
    );
    res.json({ news: rows });
  })
);

router.get(
  "/news/:lang/:slug",
  [param("lang").isIn(["it", "es", "en"]), param("slug").notEmpty()],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      "select * from news where language = $1 and slug = $2 and status = 'published'",
      [req.params.lang, req.params.slug]
    );
    if (!rows[0]) return res.status(404).json({ message: "News not found" });
    res.json({ article: rows[0] });
  })
);

router.post(
  "/contact-requests",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("company").optional({ nullable: true }).isString(),
    body("phone").optional({ nullable: true }).isString(),
    body("country").notEmpty(),
    body("language").isIn(["it", "es", "en"]),
    body("interestArea").notEmpty(),
    body("message").notEmpty(),
    body("privacyAccepted").custom((value) => value === true || value === "true")
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `insert into contact_requests (name, company, email, phone, country, language, interest_area, message, privacy_accepted)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       returning id, created_at`,
      [
        req.body.name,
        req.body.company,
        req.body.email,
        req.body.phone,
        req.body.country,
        req.body.language,
        req.body.interestArea,
        req.body.message,
        true
      ]
    );
    res.status(201).json({ message: "Contact request saved", request: rows[0] });
  })
);

export default router;
