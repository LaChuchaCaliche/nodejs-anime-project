const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const animeFilePath = path.join(__dirname,"../../data/animeData.json");

// Leer animes desde el archivo
const readAnime = () => {
  const animeData = fs.readFileSync(animeFilePath,"utf8"); // Leer el archivo. Este poderoso metodo nos permite leer archivos de manera sincrona.
  return JSON.parse(animeData); // Retornar los datos en formato JSON.
};

// Escribir animes en el archivo
const writeAnime = (animes) => {
  fs.writeFileSync(animeFilePath, JSON.stringify(animes, null, 2),"utf8"); // Escribir los datos en el archivo. Este poderoso metodo nos permite escribir archivos de manera sincrona.
};

// Crear un nuevo anime
router.post("/", (req, res) => {
  const animes = readAnime();
  const newAnime = {
    id: animes.studios.length + 1, // simulamos un id autoincrementable
    name: req.body.name, // obtenemos el titulo de la tarea desde el cuerpo de la solicitud
    
  };
  animes.studios.push(newAnime);
  writeAnime(animes);
  res.status(201).json({ message: "Estudio agregado exitosamente", studio: newAnime });
});

// Obtener todas los animes
router.get("/", (req, res) => {
  const animes = readAnime();
  res.json(animes.studios);
});

// Obtener una anime por ID
router.get("/:id", (req, res) => {
  const animes = readAnime();
  const anime = animes.studios.find((t) => t.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).json({ message: "Estudio no encontrado",anime:anime });
  }
  res.json(anime.studios);
});

// Actualizar una Anime por ID
router.put("/:id", (req, res) => {
  const animes = readAnime();
  const animeIndex = animes.studios.findIndex((t) => t.id === parseInt(req.params.id));
  if (animeIndex === -1) {
    return res.status(404).json({ message: "Estudio no encontrado" });
  }
  const updatedAnime = {
    ...animes.studios[animeIndex],
    name: req.body.name,

  };
  animes.studios[animeIndex] = updatedAnime;
  writeAnime(animes.studios);
  res.json({ message: "Estudio actualizado exitosamente", task: updatedAnime });
});

// Eliminar una anime por ID
router.delete("/:id", (req, res) => {
  const animes = readAnime();
  const newAnime = animes.studios.filter((t) => t.id !== parseInt(req.params.id));
  if (animes.length === newAnime.length) {
    return res.status(404).json({ message: "Director no encontrado" });
  }
  animes.animes = newAnime
  writeAnime(animes);
  res.json({ message: "Anime eliminado exitosamente" });
});

module.exports = router;