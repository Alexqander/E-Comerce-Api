import express from 'express';
import cors from 'cors';
import indexRoutes from '../api/routes/index.routes.js';
import { handlRoutesErrors } from '../api/middlewares/utils/utils.js';
import morgan from 'morgan';
import { accessLogStream, assignId, morganFormat } from '../config/morgan.js';

export default async ({ app }) => {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET,PUT,PATCH,POST,DELETE'
    })
  );
  app.use((req, res, next) => {
    if (req.path === '/apiEcomerce/1.0/payment/webhook-stripe') {
      next();
    } else {
      express.json()(req, res, next);
    }
  });
  app.use((req, res, next) => {
    if (req.path === '/apiEcomerce/1.0/payment/webhook-stripe') {
      next();
    } else {
      express.urlencoded({ extended: true })(req, res, next);
    }
  });
  // ? Morgan config
  morgan.token('id', (req, res) => {
    return req.id;
  });
  app.use(assignId);
  app.use(morgan(morganFormat, { stream: accessLogStream }));
  app.use(morgan(morganFormat));
  // ? -----------------------------------------
  app.use('/apiEcomerce/1.0', indexRoutes);
  app.use(handlRoutesErrors);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};
// * http//localhost:4000/apiEcomerce/1.0/ -> indexRoutes
