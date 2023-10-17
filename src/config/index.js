import dotenv from "dotenv";

const envFound = dotenv.config();
if (!envFound) {
	throw new Error("⚠️Couldn't find .env file⚠️ ");
}

export default {
	app: {
		port: parseInt(process.env.PORT, 10),
	},
	database: {
		dbConnection: process.env.DB_CONNECTION,
		dbHost: process.env.DB_HOST,
		dbPort: process.env.DB_PORT,
		dbName: process.env.DB_DATABASE,
		dbUser: process.env.DB_USERNAME,
		dbPassword: process.env.DB_PASSWORD,
	},
	jwt: {
		jwtSecret: process.env.jwtSecret,
		jwtExpire: process.env.JWT_EXPIRE_IN,
	},
	stripe: {
		stripeSecret: process.env.STRIPE_SECRET,
		stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
	},
};
