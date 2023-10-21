import config from './config/index.js';
import express from 'express';
import loaders from './loaders/index.js';

async function startServer() {
  const app = express();
  try {
    await loaders({ expressApp: app });
    app.listen(config.app.port);
    console.log(
      `✅ Servidor iniciado correctamente en el puerto ${config.app.port}`
    );
  } catch (error) {
    console.log('❌ Error al iniciar el servidor: ', error);
  }
}

startServer();
