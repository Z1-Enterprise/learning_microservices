import { ResourceNotFoundError } from "@/errors/resource-not-found.error.ts";
import type { User } from "@/generated/prisma/client.ts";
import type { UserRepository } from "@/repositories/user.repository.ts";

interface GetUserByIdServiceRequest {
  id: string
}

interface GetUserByIdServiceResponse {
  user: User
}

export class GetUserByIdService {
  constructor(private userRepository: UserRepository) {}
  
  async execute({ id }: GetUserByIdServiceRequest): Promise<GetUserByIdServiceResponse> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ResourceNotFoundError("Usuário não encontrado")
    }
    return {
      user,
    }
  }
}