import prisma from '@/libs/prisma';
import dayjs from 'dayjs'

export async function getUserById(id: string) {
  return await prisma.users.findUnique({
    where: {
      Id: id,
    },
  });
}

export async function getUserByEmail(Id: string) {
  return await prisma.users.findUnique({
    where: {
      Id: Id,
    },
  });
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  companyId: string;
  session_userId: string
}) {
  return await prisma.users.create({
    data: {
      Id: `U${dayjs().format('YYYYMMDDHHmm')}`,
      email: data.email,
      username: '',
      password: data.passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      sex: '',
      dept: '',
      job: '',
      phone: '',
      companyId: data.companyId,
      created_by: data.session_userId,
      updated_by: ''
    },
  });
}

export async function updateUser(id: string, data: { firstName?: string, lastName?: string }) {
  return await prisma.users.update({
    where: {
      Id: id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName
    },
  });
}

export async function deleteUser(id: string) {
  return await prisma.users.delete({
    where: {
      Id: id,
    },
  });
}
