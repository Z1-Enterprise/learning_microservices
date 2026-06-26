import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET muito curto"),
  USER_SERVICE_URL: z.string().url(),
  PRODUCT_SERVICE_URL: z.string().url(),
  ORDER_SERVICE_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables");
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
