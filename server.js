import { APP_PORT } from "./app/config/index.js";
import { app } from "./app/app.js";

/* ----------------------------- server settings ---------------------------- */
const PORT = 8080 || APP_PORT; // Cambiar el orden cuando se haga deploy a Glitch
app.listen(PORT, (error) => {
  if (error) throw new Error(`Error en servidor ${error}`);
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});
