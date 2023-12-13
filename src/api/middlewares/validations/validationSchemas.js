import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ValidationError } from '../../../helpers/handleErrors.js';

const ajv = addFormats(new Ajv({}), [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex',
  'uuid'
]);

export const validateSchema = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      //! Si la validación falla, envía una respuesta 400 con los detalles del error
      const error = new ValidationError(validate.errors);
      console.log(error);
      res.status(400).json({
        error: {
          name: error.name,
          message: error.message,
          details: error.errors
        }
      });
    } else {
      // ? Si la validación es exitosa, pasa al siguiente middleware
      next();
    }
  };
};
