// ? Código de estado 200:
// ? este es el código de estado estándar “OK” para una solicitud HTTP correcta.
// ?La respuesta que se devuelve depende de la solicitud

import { NotFoundError } from "./handleErrors.js";

export function getResponse200(res, data, operation) {
  return res
    .status(200)
    .json({ message: `succesful operation ${operation}`, data: data });
}

// ? Cádigo de estado 201:es el código de estado que confirma que la solicitud se realizó correctamente
// ? y, como resultado, se creó un nuevo recurso.Normalmente,
// ? este es el código de estado que se envía después de una solicitud POST / PUT.

export function getResponse201(res, resource, operation) {
  return res.status(201).json({
    message: `your resource ${resource} has been successfully ${operation}`,
    data: resource,
  });
}

// ? Código de estado 400: el servidor no puede comprender y procesar una solicitud debido
// ? a un error de cliente.Los datos que faltan, la validación de dominio y el formato no válido
// ? son algunos ejemplos que hacen que se envíe el código de estado 400.
export function getResponse400(res, error) {
  return res.status(400).json({ message: "Bad Request", error: error });
}

// ? Código de estado 401: esta solicitud de código de estado se produce cuando se requiere autenticación,
// ? pero se ha producido un error o no se ha proporcionado.

export function getResponse401(res) {
  return res.status(401).json({ message: "Unauthorized" });
}

// ? Código de estado 403: muy similar al código de estado 401, se produce un código de estado 403
// ? cuando se envía una solicitud válida, pero el servidor se niega a aceptarla.Esto sucede si un cliente
// ? usuario requiere el permiso necesario o puede necesitar una cuenta para acceder al recurso.

export function getResponse403(res) {
  return res
    .status(403)
    .json({ message: "You do not have permission to access this resource" });
}
export function getResponse404(res) {
  const error404 = new NotFoundError();
  return res.status(404).json({ message: error404 });
}
export function getResponse500(res, errors) {
  return res.status(500).json({
    message: "ah ocurrido un error en el servidor",
    errors,
  });
}
