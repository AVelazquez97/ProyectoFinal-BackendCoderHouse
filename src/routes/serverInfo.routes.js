import { Router } from 'express';
import { cpus } from 'os';
import { PERSISTENCY, CLUSTER_MODE, APP_PORT } from '../config/index.js';

const router = Router();

router.get('/', (req, res) => {
  const info = {
    persitency: PERSISTENCY,
    clusterMode: CLUSTER_MODE,
    port: APP_PORT,
    environment: process.env.NODE_ENV,
    path: process.execPath, //Path de ejecución
    os: process.platform, //Nombre de la plataforma (sistema operativo)
    pid: process.pid, //Process id
    nodeVersion: process.version, //Versión de node.js
    dirPath: process.cwd(), //Carpeta del proyecto
    memoryUsage: process.memoryUsage.rss() / 2 ** 20, //Memoria total reservada (rss) en MiB
    numCPUs: CLUSTER_MODE ? cpus().length : 1,
  };

  res.render('serverInfo', {
    info,
  });
});

export default router;
