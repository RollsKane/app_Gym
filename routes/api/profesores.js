const router = require("express").Router();

const Profesor = require("../../models/profesor");

// Aquí irían los Middlewares

// GET http://localhost:3000/api/profesores/
// Método GET para conseguir la Api con Jsons
router.get("/", async (req, res) => {
  console.log(req.payload);
  const rows = await Profesor.getAll();
  res.json(rows);
});

// GET http://localhost:3000/api/profesors/:profesorId
// Método GET para conseguir un solo profesor con la Api
router.get("/:profesorId", async (req, res) => {
  const profesor = await Profesor.getById(req.params.profesorId);
  res.json(profesor);
});

// POST http://localhost:3000/api/profesores/
// Método POST para crear un profesores nuevo
router.post("/", async (req, res) => {
  const result = await Profesor.create(req.body);
  if (result["affectedRows"] === 1) {
    const profesor = await Profesor.getById(result["insertId"]);
    res.json(profesor);
  } else {
    res.json({ error: "El profesor no se ha insertado" });
  }
});

// DELETE http://localhost:3000/api/profesores/
// Método DELETE para borrar un profesor
router.delete("/", async (req, res) => {
  const result = await Profesor.deleteById(req.body.profesorId);
  if (result["affectedRows"] === 1) {
    res.json({ success: "El profesor ha sido truncado" });
  } else {
    res.json({ error: "El profesor NO ha sido truncated" });
  }
});

module.exports = router;
