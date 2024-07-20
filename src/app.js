const express = require("express"); // Importamos Express
const animeRoutes = require("./routes/animeRoutes"); // Importamos las rutas de la API
const errorHandler = require("./middlewares/errorHandler"); 
const animeDirectors = require("./routes/directorsRoute");
const animeStudios = require("./routes/studio.js");

const app = express(); // Instanciamos Express
const PORT = 3000; // Puerto del servidor en donde se ejecutará la API

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON. Tambien conocido como middleware de aplicación.
app.use("/animes", animeRoutes); // Middleware para manejar las rutas de la API. Tambien conocido como middleware de montaje o de enrutamiento.
app.use(errorHandler); // Middleware para manejar errores.
app.use("/directors",animeDirectors)
app.use("/studios",animeStudios)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});