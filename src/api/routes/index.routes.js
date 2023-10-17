import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { removeExtensionFromFile } from "../middleware/utils/utils.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathRouter = `${__dirname}`;

async function loadRoutes() {
	const files = fs.readdirSync(pathRouter);

	for (const file of files) {
		const routeFile = removeExtensionFromFile(file);

		if (routeFile !== "index" /* && routeFile !== "auth.routes" */) {
			console.log(`---->> ${routeFile}`);
			const routeModule = await import(`./${routeFile}.routes.js`);
			router.use(`/${routeFile}`, routeModule.default);
		}
	}
}
loadRoutes();
export default router;
