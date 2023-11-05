import { handleUpload } from '../../../config/cloudinary.js';
import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  saveImageProduct,
  saveProduct
} from '../../services/products.service.js';

export const getProducts = async (req, res) => {};
export const getProduct = async (req, res) => {};
export const createProduct = async (req, res) => {};
export const updateProduct = async (req, res) => {};
export const uploadProductImage = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return getResponse500(res, 'No se ha subido ningún archivo');
    }
    const product = await saveProduct(req.body);
    if (product.error) {
      return getResponse500(res, product.message);
    }
    const imageUploadPromises = files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataUri = 'data:' + file.mimetype + ';base64,' + b64;
      const uploadResult = await handleUpload(dataUri);

      const imageUrl = uploadResult.url;

      const imageProduct = await saveImageProduct(imageUrl, product.data.id);
      if (imageProduct.error) {
        return imageProduct;
      }

      return imageProduct;
    });
    const images = await Promise.all(imageUploadPromises);
    return getResponse200(res, images);
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
