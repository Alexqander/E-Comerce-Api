import express from "express";
import cors from "cors";
import indexRoutes from "../api/routes/index.routes.js";
import { handlErrors } from "../api/middleware/utils/utils.js";

export default async ({ app }) => {
	app.use(cors());
	app.use(express.json());
	app.use("/api/1.0", indexRoutes);
	app.use(handlErrors);
};
