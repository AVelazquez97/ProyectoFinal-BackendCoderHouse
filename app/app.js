import express from 'express';
import { router as rest } from './routes/index.routes.js';
import { badRequest } from './middlewares/error404.middleware.js';
import { handleErrors } from './middlewares/handleErrors.middleware.js';

const app = express();

/* -------------------------- middlewares settings -------------------------- */
/* app.use(express.static('public')); 
 app.use(express.urlencoded({ extended: true }));
 
 **Solo backend por ahora**
*/
app.use(express.json());

// Se cargan las rutas de la api restful en la app
app.use('/api', rest);

app.use(handleErrors);
app.use(badRequest); // Middleware que evalua si el endpoint visitado existe o no

export { app };
