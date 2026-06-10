import { InvalidCredentialsError } from "@/errors/invalid-credentials.error.ts"
import { ResourceNotFoundError } from "@/errors/resource-not-found.error.ts"
import type { User } from "@/generated/prisma/client.ts"
import type { UserRepository } from "@/repositories/user.repository.ts"
import bcrypt from "bcryptjs"

interface LoginServiceRequest {
  email: string
  password: string
}

interface LoginServiceResponse {
  user: User
}

export class LoginService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ email, password }: LoginServiceRequest): Promise<LoginServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError("Usuário não encontrado")
    }

    const doesPasswordMatches = await bcrypt.compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
