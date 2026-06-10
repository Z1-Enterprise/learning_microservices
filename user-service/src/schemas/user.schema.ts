import z from "zod"

const REGISTER = z.object({
  name: z.string().min(1, { error: "O nome é obrigatório" }),
  email: z.email().min(1, { error: "O email é obrigatório" }),
  password: z
    .string()
    .min(1, { error: "A senha é obrigatória" })
    .min(8, { error: "A senha deve ter no mínimo 8 caracteres" })
    .regex(/[A-Z]/, { error: "A senha deve conter letras maiúsculas" })
    .regex(/[a-z]/, { error: "A senha deve conter letras minúsculas" })
    .regex(/\d/, { error: "A senha deve conter números" }),
})

const LOGIN = z.object({
  email: z.string().min(1, { error: "O email é obrigatório" }),
  password: z.string().min(1, { error: "A senha é obrigatória" }),
})

const GET_USER_BY_ID = z.object({
  id: z.string().min(1, { error: "O id é obrigatório" }),
})

export const USER_SCHEMA = {
  REGISTER,
  LOGIN,
  GET_USER_BY_ID,
}
