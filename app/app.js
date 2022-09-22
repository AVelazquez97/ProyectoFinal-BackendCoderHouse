import express from 'express';
import logger from 'morgan';
import { router as rest } from './routes/index.routes.js';
import { badRequest } from './middlewares/error404.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

/* -------------------------- middlewares settings -------------------------- */
/* app.use(express.static('public')); 
 app.use(express.urlencoded({ extended: true }));
 
 **Solo backend por ahora**
*/
app.use(logger('dev'));
app.use(express.json());

// Se cargan las rutas de la api restful en la app
app.use('/api', rest);

app.use(errorHandler);
app.use(badRequest); // Middleware que evalua si el endpoint visitado existe o no

export { app };
