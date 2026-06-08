import express from "express";
import { body, param } from "express-validator";
import { authenticate, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { query } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../config/mail.js";

const router = express.Router();
router.use(authenticate, requireRole("admin", "operator"));

router.get(
  "/dashboard",
  asyncHandler(async (req, res) => {
    const [tickets, customers, contacts] = await Promise.all([
      query("select status, count(*)::int as total from tickets group by status"),
      query("select status, count(*)::int as total from users group by status"),
      query("select count(*)::int as total from contact_requests where handled_at is null")
    ]);

    res.json({
      ticketsByStatus: tickets.rows,
      usersByStatus: customers.rows,
      openContactRequests: contacts.rows[0]?.total || 0
    });
  })
);

router.get(
  "/customers",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select c.*, u.email, u.status
       from customers c join users u on u.id = c.user_id
       order by c.created_at desc`
    );
    res.json({ customers: rows });
  })
);

router.patch(
  "/customers/:id/approval",
  requireRole("admin"),
  [param("id").isUUID(), body("approved").isBoolean()],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `update users set status = $2
       where id = (select user_id from customers where id = $1)
       returning id, email, status`,
      [req.params.id, req.body.approved ? "active" : "disabled"]
    );
    if (!rows[0]) return res.status(404).json({ message: "Customer not found" });

    await sendMail({
      to: rows[0].email,
      subject: req.body.approved ? "Account approvato" : "Account non approvato",
      text: req.body.approved ? "Il tuo account cliente e ora attivo." : "La tua richiesta di account non e stata approvata."
    });

    res.json({ user: rows[0] });
  })
);

router.get(
  "/users",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select u.id, u.email, u.status, u.preferred_language, r.name as role, u.created_at
       from users u join roles r on r.id = u.role_id
       order by u.created_at desc`
    );
    res.json({ users: rows });
  })
);

router.patch(
  "/users/:id",
  requireRole("admin"),
  [
    param("id").isUUID(),
    body("status").optional().isIn(["pending", "active", "disabled"]),
    body("role").optional().isIn(["admin", "operator", "customer"])
  ],
  validate,
  asyncHandler(async (req, res) => {
    const roleId = req.body.role
      ? (await query("select id from roles where name = $1", [req.body.role])).rows[0]?.id
      : null;
    const { rows } = await query(
      `update users set status = coalesce($2, status), role_id = coalesce($3, role_id)
       where id = $1 returning id, email, status, role_id`,
      [req.params.id, req.body.status, roleId]
    );
    res.json({ user: rows[0] });
  })
);

router.get(
  "/contact-requests",
  asyncHandler(async (req, res) => {
    const { rows } = await query("select * from contact_requests order by created_at desc");
    res.json({ contactRequests: rows });
  })
);

router.patch(
  "/contact-requests/:id/handled",
  [param("id").isUUID()],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      "update contact_requests set handled_at = now(), handled_by_user_id = $2 where id = $1 returning *",
      [req.params.id, req.user.id]
    );
    res.json({ contactRequest: rows[0] });
  })
);

router.get(
  "/news",
  asyncHandler(async (req, res) => {
    const { rows } = await query("select * from news order by created_at desc");
    res.json({ news: rows });
  })
);

router.post(
  "/news",
  requireRole("admin"),
  [
    body("language").isIn(["it", "es", "en"]),
    body("slug").notEmpty(),
    body("title").notEmpty(),
    body("excerpt").notEmpty(),
    body("body").notEmpty(),
    body("category").notEmpty(),
    body("status").isIn(["draft", "published", "disabled"]),
    body("showOnHome").isBoolean()
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `insert into news (language, slug, title, excerpt, body, category, status, show_on_home, published_at, author_user_id)
       values ($1,$2,$3,$4,$5,$6,$7,$8,case when $7 = 'published' then now() else null end,$9)
       returning *`,
      [
        req.body.language,
        req.body.slug,
        req.body.title,
        req.body.excerpt,
        req.body.body,
        req.body.category,
        req.body.status,
        req.body.showOnHome,
        req.user.id
      ]
    );
    res.status(201).json({ article: rows[0] });
  })
);

router.put(
  "/news/:id",
  requireRole("admin"),
  [
    param("id").isUUID(),
    body("title").notEmpty(),
    body("excerpt").notEmpty(),
    body("body").notEmpty(),
    body("category").notEmpty(),
    body("status").isIn(["draft", "published", "disabled"]),
    body("showOnHome").isBoolean()
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `update news
       set title=$2, excerpt=$3, body=$4, category=$5, status=$6, show_on_home=$7,
           published_at = case when $6 = 'published' and published_at is null then now() else published_at end,
           updated_at = now()
       where id=$1 returning *`,
      [req.params.id, req.body.title, req.body.excerpt, req.body.body, req.body.category, req.body.status, req.body.showOnHome]
    );
    res.json({ article: rows[0] });
  })
);

router.get(
  "/service-pages",
  asyncHandler(async (req, res) => {
    const { rows } = await query("select * from service_pages order by sort_order, language");
    res.json({ servicePages: rows });
  })
);

router.put(
  "/service-pages/:id",
  requireRole("admin"),
  [
    param("id").isUUID(),
    body("title").notEmpty(),
    body("summary").notEmpty(),
    body("body").notEmpty(),
    body("features").isArray(),
    body("isPublished").isBoolean()
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `update service_pages
       set title=$2, summary=$3, body=$4, features=$5, is_published=$6, updated_at=now()
       where id=$1 returning *`,
      [req.params.id, req.body.title, req.body.summary, req.body.body, req.body.features, req.body.isPublished]
    );
    res.json({ servicePage: rows[0] });
  })
);

router.get(
  "/documents",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select d.*, c.business_name
       from documents d left join customers c on c.id = d.customer_id
       order by d.created_at desc`
    );
    res.json({ documents: rows });
  })
);

router.post(
  "/documents",
  requireRole("admin"),
  [body("title").notEmpty(), body("fileUrl").notEmpty(), body("customerId").optional({ nullable: true }).isUUID()],
  validate,
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `insert into documents (customer_id, title, description, file_url, uploaded_by_user_id)
       values ($1,$2,$3,$4,$5) returning *`,
      [req.body.customerId, req.body.title, req.body.description, req.body.fileUrl, req.user.id]
    );
    res.status(201).json({ document: rows[0] });
  })
);

router.get(
  "/login-logs",
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const { rows } = await query("select * from login_logs order by created_at desc limit 300");
    res.json({ loginLogs: rows });
  })
);

export default router;
