import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function findUserEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }
  return { id: user.uuid, email: user.email };
}

export async function findUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      uuid: id,
    },
  });
  if (!user) {
    return null;
  }
  return { id: user.uuid, email: user.email };
}
