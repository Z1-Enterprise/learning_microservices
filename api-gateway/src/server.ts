import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import httpProxy from "@fastify/http-proxy";
import { env } from "./env";
import { registerAuthMiddleware } from "./middleware/auth.middleware";

const app = Fastify();

const start = async () => {
  // ── Plugins ──────────────────────────────────────────
  await app.register(cors, { origin: true });
  await app.register(jwt, { secret: env.JWT_SECRET });

  // ── Auth hook (antes dos proxies) ─────────────────────
  registerAuthMiddleware(app);

  // ── Health check ──────────────────────────────────────
  app.get("/health", async () => ({
    status: "ok",
    service: "api-gateway",
    timestamp: new Date().toISOString(),
  }));

  // ── Proxies ───────────────────────────────────────────
  await app.register(httpProxy, {
    upstream: env.USER_SERVICE_URL,
    prefix: "/user",
    rewritePrefix: "/user",
  });

  await app.register(httpProxy, {
    upstream: env.PRODUCT_SERVICE_URL,
    prefix: "/product",
    rewritePrefix: "/product",
  });

  await app.register(httpProxy, {
    upstream: env.ORDER_SERVICE_URL,
    prefix: "/order",
    rewritePrefix: "/order",
  });

  // ── Inicia ────────────────────────────────────────────
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log("HTTP SERVER RUNNING");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
