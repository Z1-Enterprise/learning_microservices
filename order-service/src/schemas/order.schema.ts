import { z } from "zod";
export const createOrderSchema = z.object({
  userId: z.string(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        price: z.number().positive(),
      }),
    )
    .min(1, "O pedido precisa ter pelo menos 1 item"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
