import { app } from "@/app.ts";
import { env } from "@/lib/env.ts";
import { productRoutes } from "@/routes/index.ts";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

app.get("/health", async () => {
  return {
    status: "ok",
    service: "Product Service",
    timeStamp: new Date().toISOString(),
  };
});

app.register(productRoutes, { prefix: "/product" });

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(StatusCodes.BAD_REQUEST).send({
      success: false,
      message: z.treeifyError(error),
    });
  }

  return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: "INTERNAL_SERVER_ERROR",
  });
});

const start = async () => {
  try {
    app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    console.log("HTTP Server running");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
