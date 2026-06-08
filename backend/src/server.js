import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/tickets.js";
import adminRoutes from "./routes/admin.js";
import publicRoutes from "./routes/public.js";
import customerRoutes from "./routes/customer.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { clean } from "./utils/sanitize.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 250 }));
app.use((req, res, next) => {
  req.body = clean(req.body);
  next();
});

const csrfProtection = csrf({ cookie: { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" } });
app.get("/api/csrf-token", csrfProtection, (req, res) => res.json({ csrfToken: req.csrfToken() }));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/uploads", express.static("uploads"));
app.use("/api/public", publicRoutes);
app.use("/api/auth", csrfProtection, authRoutes);
app.use("/api/customer", csrfProtection, customerRoutes);
app.use("/api/tickets", csrfProtection, ticketRoutes);
app.use("/api/admin", csrfProtection, adminRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`SPBnext API listening on http://localhost:${port}`);
});
