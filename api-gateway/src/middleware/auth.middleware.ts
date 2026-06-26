import { FastifyInstance } from "fastify";

// rotas que não precisam de token
const PUBLIC_ROUTES = new Set(["/user/register", "/user/login", "/health"]);

export const registerAuthMiddleware = (app: FastifyInstance) => {
  app.addHook("onRequest", async (req, reply) => {
    if (PUBLIC_ROUTES.has(req.url)) return;

    try {
      await req.jwtVerify();
    } catch {
      reply.status(401).send({
        message: "Token inválido ou ausente",
      });
    }
  });
};
