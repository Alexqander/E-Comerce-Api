import { validationResult } from "express-validator";
import { getResponse400 } from "./Responses.js";

export const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    getResponse400(res, error.array());
  }
};
