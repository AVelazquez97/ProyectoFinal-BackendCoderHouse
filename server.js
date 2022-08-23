import { APP_PORT } from "./app/config/index.js";
import { app } from "./app/app.js";

/* ----------------------------- server settings ---------------------------- */
const PORT = APP_PORT || 8080;
app.listen(PORT, (error) => {
  if (error) throw new Error(`Error en servidor ${error}`);
  console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});
