import bcrypt from "bcryptjs"
import type { User } from "@/generated/prisma/client.ts"
import { UserRepository } from "@/repositories/user.repository.ts"
import { UserAlreadyExistsError } from "@/errors/user-already-exists.error.ts"

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}

export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest): Promise<RegisterServiceResponse> {
    // verificar se o usuário já existe com o email informado
    const doesUserExistsWithEmail = await this.userRepository.findByEmail(email)
    if (doesUserExistsWithEmail) {
      throw new UserAlreadyExistsError()
    }
    const passwordHashed = await bcrypt.hash(password, 10)

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHashed,
    })

    return {
      user,
    }
  }
}
