import { env } from "@/lib/env.ts";

export async function findUserById(userId: string) {
  const response = await fetch(`${env.USER_SERVICE_URL}/user/${userId}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Erro ao comunicar com o user-service");
  }

  return response.json();
}
