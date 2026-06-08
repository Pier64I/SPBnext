import express from "express";
import { authenticate, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { query } from "../config/db.js";

const router = express.Router();
router.use(authenticate, requireRole("customer"));

router.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select c.*, u.email, u.status
       from customers c join users u on u.id = c.user_id
       where c.user_id = $1`,
      [req.user.id]
    );
    res.json({ profile: rows[0] });
  })
);

router.get(
  "/documents",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select id, title, description, file_url, created_at
       from documents
       where customer_id = $1 or customer_id is null
       order by created_at desc`,
      [req.user.customer_id]
    );
    res.json({ documents: rows });
  })
);

router.get(
  "/communications",
  asyncHandler(async (req, res) => {
    const { rows } = await query(
      `select id, subject, body, created_at, read_at
       from customer_communications
       where customer_id = $1
       order by created_at desc`,
      [req.user.customer_id]
    );
    res.json({ communications: rows });
  })
);

export default router;
