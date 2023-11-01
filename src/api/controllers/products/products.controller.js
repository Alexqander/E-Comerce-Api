import { handleUpload } from '../../../config/cloudinary.js';
import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';

export const getProducts = async (req, res) => {};
export const getProduct = async (req, res) => {};
export const createProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const uploadProductImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = 'data:' + req.file.mimetype + ';base64,' + b64;
    const cldRes = await handleUpload(dataUri);
    return getResponse200(res, cldRes, 'Imagen subida correctamente');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
