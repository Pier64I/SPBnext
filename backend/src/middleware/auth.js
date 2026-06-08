import jwt from "jsonwebtoken";
import { query } from "../config/db.js";

export async function authenticate(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await query(
      `select u.id, u.email, u.status, r.name as role_name, c.id as customer_id
       from users u
       join roles r on r.id = u.role_id
       left join customers c on c.user_id = u.id
       where u.id = $1`,
      [payload.sub]
    );

    const user = rows[0];
    if (!user || user.status !== "active") {
      return res.status(403).json({ message: "Account not active" });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role_name)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}
