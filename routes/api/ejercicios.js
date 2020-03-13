const router = require("express").Router();

const Ejercicio = require("../../models/ejercicio");

// Aquí irían los Middlewares

// GET http://localhost:3000/api/ejercicios/
// Método GET para conseguir la Api con Jsons
router.get("/", async (req, res) => {
  console.log(req.payload);
  const rows = await Ejercicio.getAll();
  res.json(rows);
});

// GET http://localhost:3000/api/ejercicios/:ejercicioId
// Método GET para conseguir un solo ejercicio con la Api
router.get("/:ejercicioId", async (req, res) => {
  const ejercicio = await Ejercicio.getById(req.params.ejercicioId);
  res.json(ejercicio);
});

// POST http://localhost:3000/api/ejercicios/
// Método POST para crear un ejercicio nuevo
router.post("/", async (req, res) => {
  const result = await Ejercicio.create(req.body);
  if (result["affectedRows"] === 1) {
    const ejercicio = await Ejercicio.getById(result["insertId"]);
    res.json(ejercicio);
  } else {
    res.json({ error: "El ejercicio no se ha insertado" });
  }
});

// DELETE http://localhost:3000/api/ejercicios/
// Método DELETE para borrar un ejercicio
router.delete("/", async (req, res) => {
  const result = await Ejercicio.deleteById(req.body.ejercicioId);
  if (result["affectedRows"] === 1) {
    res.json({ success: "El ejercicio ha sido truncado" });
  } else {
    res.json({ error: "El ejercicio NO ha sido truncated" });
  }
});

module.exports = router;
