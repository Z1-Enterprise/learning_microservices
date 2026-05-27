import { PrismaClient } from "@/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "@/lib/env.ts";

const url = env.DATABASE_URL;

const adapter = new PrismaBetterSqlite3({ url });
export const prisma = new PrismaClient({ adapter });
