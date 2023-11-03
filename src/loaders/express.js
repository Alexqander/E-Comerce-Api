import express from 'express';
import cors from 'cors';
import indexRoutes from '../api/routes/index.routes.js';
import { handlRoutesErrors } from '../api/middlewares/utils/utils.js';
import passport from 'passport';
import morgan from 'morgan';
import { accessLogStream } from '../config/morgan.js';

export default async ({ app }) => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET,PUT,PATCH,POST,DELETE'
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  morgan.token('type', (req, res) => {
    return req.headers['content-type'];
  });

  app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :date[web] :type',
      { stream: accessLogStream }
    )
  );
  app.use('/apiEcomerce/1.0', indexRoutes);
  app.use(handlRoutesErrors);
};
// * http//localhost:4000/apiEcomerce/1.0/ -> indexRoutes
