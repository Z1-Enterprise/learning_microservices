import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables");
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
