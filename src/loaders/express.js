import express from 'express';
import cors from 'cors';
import indexRoutes from '../api/routes/index.routes.js';
import { handlRoutesErrors } from '../api/middlewares/utils/utils.js';
import passport from 'passport';

export default async ({ app }) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use('/apiEcomerce/1.0', indexRoutes);
  app.use(handlRoutesErrors);
};
// * http//localhost:3000/apiEcomerce/1.0/ -> indexRoutes
