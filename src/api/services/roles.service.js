import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();
export const findRoles = async () => {
  try {
    const roles = await prisma.roles.findMany();
    return getMessage(false, roles, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error al obtener los roles');
  }
};

export const saveRole = async (role) => {
  try {
    const roles = await prisma.roles.create({
      data: role
    });
    return getMessage(false, roles, 'Role created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error al crear el rol');
  }
};
