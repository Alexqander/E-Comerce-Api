import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();

export const fetchProfileInfo = async (userId) => {
  try {
    const profile = await prisma.curierProfile.findUnique({
      where: { userId }
    });
    return getMessage(false, profile, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching profile info');
  }
};

export const createProfileInfo = async (userId, profileData) => {
  try {
    const newProfile = await prisma.curierProfile.create({
      data: { ...profileData, userId }
    });
    return getMessage(false, newProfile, 'Profile successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating profile info');
  }
};

export const modifyProfileInfo = async (userId, updates) => {
  try {
    const updatedProfile = await prisma.curierProfile.update({
      where: { userId },
      data: updates
    });
    return getMessage(false, updatedProfile, 'Profile successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating profile info');
  }
};

export const fetchAssignedOrders = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: { courierId: userId }
    });
    return getMessage(false, orders, 'Orders successfully fetched');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching assigned orders');
  }
};

export const modifyAssignedOrder = async (userId, orderId, updates) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: updates
    });
    return getMessage(false, order, 'Order successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating assigned order');
  }
};
