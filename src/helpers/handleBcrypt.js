import bcrypt from "bcryptjs";

// * encryptacion de contraseña
export const encrypt = async (textPlain) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(textPlain, salt);
};

// * comparar contraseña
export const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};
