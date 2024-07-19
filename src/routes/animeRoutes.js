const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const animeFilePath = path.join(__dirname,"../../data/animeData.json");

// Leer tareas desde el archivo
const readAnime = () => {
  const animeData = fs.readFileSync(animeFilePath,"utf8"); // Leer el archivo. Este poderoso metodo nos permite leer archivos de manera sincrona.
  return JSON.parse(animeData); // Retornar los datos en formato JSON.
};

// Escribir tareas en el archivo
const writeAnime = (animes) => {
  fs.writeFileSync(animeFilePath, JSON.stringify(animes, null, 2),"utf8"); // Escribir los datos en el archivo. Este poderoso metodo nos permite escribir archivos de manera sincrona.
};

// Crear una nueva tarea
router.post("/", (req, res) => {
  const animes = readAnime();
  const newAnime = {
    id: animes.length + 1, // simulamos un id autoincrementable
    title: req.body.title, // obtenemos el titulo de la tarea desde el cuerpo de la solicitud
    studioId: req.body.studioId
  };
  animes.push(newAnime);
  writeAnime(animes);
  res.status(201).json({ message: "Anime agregado exitosamente", anime: newAnime });
});

// Obtener todas los animes
router.get("/", (req, res) => {
  const animes = readAnime();
  res.json(animes);
});

// Obtener una anime por ID
router.get("/:id", (req, res) => {
  const animes = readAnime();
  const anime = animes.find((t) => t.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).json({ message: "Anime no encontrado",anime:anime });
  }
  res.json(anime);
});

// Actualizar una Anime por ID
router.put("/:id", (req, res) => {
  const animes = readAnime();
  const animeIndex = animes.findIndex((t) => t.id === parseInt(req.params.id));
  if (animeIndex === -1) {
    return res.status(404).json({ message: "Anime no encontrado" });
  }
  const updatedAnime = {
    ...animes[animeIndex],
    title: req.body.title,
    genre: req.body.genre,
  };
  animes[animeIndex] = updatedAnime;
  writeAnime(animes);
  res.json({ message: "Anime actualizado exitosamente", task: updatedAnime });
});

// Eliminar una anime por ID
router.delete("/:id", (req, res) => {
  const animes = readAnime();
  const newAnime = animes.filter((t) => t.id !== parseInt(req.params.id));
  if (animes.length === newAnime.length) {
    return res.status(404).json({ message: "Anime no encontrado" });
  }
  writeAnime(newAnime);
  res.json({ message: "Anime eliminado exitosamente" });
});

module.exports = router;