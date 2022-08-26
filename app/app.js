import express from 'express';
import { router as rest } from './routes/index.routes.js';
import { badRequest } from './middlewares/routeNotFounded.middleware.js';
// import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

/* -------------------------- middlewares settings -------------------------- */
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(errorHandler);

app.use('/api', rest);

app.use(badRequest); // Middleware que evalua si el endpoint visitado existe o no

export { app };
