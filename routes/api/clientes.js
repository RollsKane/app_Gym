const router = require("express").Router();

const Cliente = require("../../models/cliente");

// Aquí irían los Middlewares

// GET http://localhost:3000/api/clientes/
// Método GET para conseguir la Api con Jsons
router.get("/", async (req, res) => {
  console.log(req.payload);
  const rows = await Cliente.getAll();
  res.json(rows);
});

// GET http://localhost:3000/api/clientes/:clienteId
// Método GET para conseguir un solo cliente con la Api
router.get("/:clienteId", async (req, res) => {
  const cliente = await Cliente.getById(req.params.clienteId);
  res.json(cliente);
});

/* MÉTODO EDIT */

// PUT http://localhost:3000/api/clientes/edit/:id
router.put("/edit/:clienteId", (req, res) => {
  Cliente.editById(req.body, req.params.id)
    .then(result => res.json(result))
    .catch(err => {
      res.json({ error: "Me cago en tus muelas. Rellena todos los campos" });
    });
});

// POST http://localhost:3000/api/clientes/
// Método POST para crear un clientes nuevo
router.post("/", async (req, res) => {
  const result = await Cliente.create(req.body);
  if (result["affectedRows"] === 1) {
    const cliente = await Cliente.getById(result["insertId"]);
    res.json(cliente);
  } else {
    res.json({ error: "El cliente no se ha insertado" });
  }
});

// DELETE http://localhost:3000/api/clientes/
// Método DELETE para borrar un clientes
router.delete("/", async (req, res) => {
  const result = await Cliente.deleteById(req.body.clienteId);
  if (result["affectedRows"] === 1) {
    res.json({ success: "El cliente ha sido erradicado" });
  } else {
    res.json({ error: "El cliente NO ha sido destruido" });
  }
});

module.exports = router;
