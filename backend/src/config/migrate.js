import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { pool, query } from "./db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseDir = path.resolve(__dirname, "../../../database");

async function tableExists(tableName) {
  const { rows } = await query(
    "select exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = $1) as exists",
    [tableName]
  );
  return rows[0]?.exists;
}

async function runSqlFile(fileName) {
  const filePath = path.join(databaseDir, fileName);
  const sql = await fs.readFile(filePath, "utf8");
  await query(sql);
  console.log(`Applied ${fileName}`);
}

async function migrate() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to run migrations");
  }

  if (await tableExists("roles")) {
    console.log("Database schema already exists, skipping initial migration");
    return;
  }

  await runSqlFile("schema.sql");
  await runSqlFile("seed.sql");
}

migrate()
  .then(async () => {
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await pool.end();
    process.exit(1);
  });
