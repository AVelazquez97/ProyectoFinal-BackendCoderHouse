import cluster from 'cluster';
import { cpus } from 'os';
import { CLUSTER_MODE, APP_PORT } from './src/config/index.js';
import { LoggerInfo, LoggerError } from './src/config/log4.js';
import { app } from './src/app.js';

/* ----------------------------- server settings ---------------------------- */
if (CLUSTER_MODE && cluster.isPrimary) {
  const numCPUs = cpus().length;
  LoggerInfo.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    const fecha = new Date().toLocaleString();
    LoggerInfo.info(
      `Worker ${worker.process.pid} fue terminado a las: ${fecha}`
    );
    cluster.fork();
  });
} else {
  const server = app.listen(APP_PORT, () => {
    LoggerInfo.info(
      `Servidor HTTP escuchando en el puerto ${server.address().port}`
    );
    LoggerInfo.info(`PID WORKER ${process.pid}`);
  });

  server.on('error', (error) => {
    LoggerError.error(`Error en el servidor: ${error.message}`);
  });
}
