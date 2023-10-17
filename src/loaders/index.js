import expressLoader from "./express.js";
import mysqlLoader from "./mysql.js";

export default async ({ expressApp }) => {
	try {
		await mysqlLoader();
	} catch (error) {
		console.log("Error al conectar con la base de datos:", error);
	}
	try {
		await expressLoader({ app: expressApp });
	} catch (error) {
		console.log("error al cargar express", error);
	}
};
