import { v4 as uuidv4 } from 'uuid';

// * funcion que genera un uid para los electrodomesticos
export function generateUidElectrodomestico(model, serie) {
  const random = Math.floor(Math.random() * 10000) + 1;

  return `${model}-${random}-${serie}`;
}

// * funcion que genera un uid en general
export function generateUid() {
  const uid = uuidv4();
  return uid;
}

export const ORDERSTATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED'
};
