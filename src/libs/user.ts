import prisma from '@/libs/prisma';

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  name?: string;
}) {
  return await prisma.user.create({
    data: {
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
    },
  });
}

export async function updateUser(id: number, data: { name?: string }) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
    },
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
}
