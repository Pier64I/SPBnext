import express from "express";
import multer from "multer";
import { body, param } from "express-validator";
import { authenticate, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { query } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const upload = multer({ dest: "uploads/tickets", limits: { fileSize: 8 * 1024 * 1024 } });
const router = express.Router();
router.use(authenticate);

const ticketCategories = [
  "reti-informatiche",
  "elettronica",
  "sicurezza",
  "automazione",
  "wms",
  "energia-green",
  "portali-web",
  "programmi-app",
  "altro"
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const customerClause = req.user.role_name === "customer" ? "where t.customer_id = $1" : "";
    const params = req.user.role_name === "customer" ? [req.user.customer_id] : [];
    const { rows } = await query(
      `select t.*, c.business_name, u.email as assigned_operator_email
       from tickets t
       join customers c on c.id = t.customer_id
       left join users u on u.id = t.assigned_operator_id
       ${customerClause}
       order by t.updated_at desc`,
      params
    );
    res.json({ tickets: rows });
  })
);

router.post(
  "/",
  upload.array("attachments", 5),
  [
    body("subject").notEmpty(),
    body("category").isIn(ticketCategories),
    body("description").notEmpty(),
    body("priority").isIn(["bassa", "media", "alta", "urgente"])
  ],
  validate,
  asyncHandler(async (req, res) => {
    if (req.user.role_name !== "customer") return res.status(403).json({ message: "Only customers can open tickets" });
    const ticket = await query(
      `insert into tickets (customer_id, subject, category, description, priority, status)
       values ($1,$2,$3,$4,$5,'aperto') returning *`,
      [req.user.customer_id, req.body.subject, req.body.category, req.body.description, req.body.priority]
    );

    await query(
      "insert into ticket_messages (ticket_id, sender_user_id, message, is_admin_reply) values ($1,$2,$3,false)",
      [ticket.rows[0].id, req.user.id, req.body.description]
    );

    for (const file of req.files || []) {
      await query(
        "insert into ticket_attachments (ticket_id, uploaded_by_user_id, file_name, file_path, mime_type, file_size) values ($1,$2,$3,$4,$5,$6)",
        [ticket.rows[0].id, req.user.id, file.originalname, file.path, file.mimetype, file.size]
      );
    }

    res.status(201).json({ ticket: ticket.rows[0] });
  })
);

router.get(
  "/:id/messages",
  [param("id").isUUID()],
  validate,
  asyncHandler(async (req, res) => {
    const allowed = await query(
      `select id from tickets where id = $1 and ($2::text <> 'customer' or customer_id = $3)`,
      [req.params.id, req.user.role_name, req.user.customer_id]
    );
    if (!allowed.rows[0]) return res.status(404).json({ message: "Ticket not found" });

    const { rows } = await query(
      `select tm.*, u.email
       from ticket_messages tm join users u on u.id = tm.sender_user_id
       where ticket_id = $1 order by created_at`,
      [req.params.id]
    );
    res.json({ messages: rows });
  })
);

router.post(
  "/:id/messages",
  upload.array("attachments", 5),
  [param("id").isUUID(), body("message").notEmpty()],
  validate,
  asyncHandler(async (req, res) => {
    const ticket = await query(
      `select * from tickets where id = $1 and ($2::text <> 'customer' or customer_id = $3)`,
      [req.params.id, req.user.role_name, req.user.customer_id]
    );
    if (!ticket.rows[0]) return res.status(404).json({ message: "Ticket not found" });

    const message = await query(
      `insert into ticket_messages (ticket_id, sender_user_id, message, is_admin_reply)
       values ($1,$2,$3,$4) returning *`,
      [req.params.id, req.user.id, req.body.message, req.user.role_name !== "customer"]
    );
    await query("update tickets set updated_at = now() where id = $1", [req.params.id]);
    res.status(201).json({ message: message.rows[0] });
  })
);

router.patch(
  "/:id",
  authenticate,
  requireRole("admin", "operator"),
  [
    param("id").isUUID(),
    body("status").optional().isIn(["aperto", "in-lavorazione", "in-attesa-cliente", "risolto", "chiuso"]),
    body("priority").optional().isIn(["bassa", "media", "alta", "urgente"]),
    body("assignedOperatorId").optional({ nullable: true }).isUUID()
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `update tickets
       set status = coalesce($2, status),
           priority = coalesce($3, priority),
           assigned_operator_id = coalesce($4, assigned_operator_id),
           updated_at = now()
       where id = $1 returning *`,
      [req.params.id, req.body.status, req.body.priority, req.body.assignedOperatorId]
    );
    res.json({ ticket: rows[0] });
  })
);

export default router;
