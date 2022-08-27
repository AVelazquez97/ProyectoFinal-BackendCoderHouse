import express from 'express';
import { router as rest } from './routes/index.routes.js';
import { isAdmin } from './middlewares/isAdmin.middleware.js';
import { badRequest } from './middlewares/routeNotFounded.middleware.js';
// import { errorHandler } from './middlewares/errorHandler.middleware.js'; No implementada

const app = express();

/* -------------------------- middlewares settings -------------------------- */
/* app.use(express.static('public')); 
 app.use(express.urlencoded({ extended: true }));
 app.use(errorHandler);
 
 **Solo backend por ahora**
*/
app.use(express.json());

app.use(isAdmin) //Middleware que evalúa el tipo de usuario que accede a un recurso

app.use('/api', rest);

app.use(badRequest); // Middleware que evalua si el endpoint visitado existe o no

export { app };
