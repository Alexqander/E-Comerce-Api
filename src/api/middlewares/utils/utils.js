import { Router } from "express";
import { getResponse404 } from "../../../helpers/Responses.js";
const router = new Router();
// * Manejo de errores
export const handlErrors = router.all("*", (req, res) => {
  return getResponse404(res);
});
export const removeExtensionFromFile = (file) => {
  return file.split(".").slice(0, -2).join(".").toString();
};

export const parseDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
