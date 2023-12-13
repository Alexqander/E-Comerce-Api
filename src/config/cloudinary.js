import { v2 as cloudinary } from 'cloudinary';
import config from './index.js';
export const cloudinaryClient = cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinaryApiSecret
});
export async function handleUpload(file) {
  try {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: 'auto'
    });
    return res;
  } catch (error) {
    console.log('Error uploading file: ', error);
    throw error;
  }
}
