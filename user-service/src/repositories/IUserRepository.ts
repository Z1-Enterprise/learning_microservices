import type { User } from "@/generated/prisma/client.ts"
import type { UserCreateInput } from "@/generated/prisma/models.ts"

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
