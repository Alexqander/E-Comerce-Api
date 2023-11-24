import dotenv from 'dotenv';

// Determinar el entorno y cargar el archivo .env correspondiente
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

const envFound = dotenv.config({ path: envFile });
if (!envFound) {
  throw new Error(`⚠️ Couldn't find ${envFile} file ⚠️`);
}

export default {
  app: {
    port: parseInt(process.env.PORT, 10)
  },
  database: {
    dbConnection: process.env.DATABASE_URL
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRES_IN
  },
  stripe: {
    stripeSecret: process.env.STRIPE_SECRET,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
  google: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  cloudinary: {
    cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
  }
};
