var router = require("express").Router();

// Requiero el modelo
const Cliente = require("../models/cliente");

// Aquí irían los Middlewares

// GET http://localhost:3000/clientes
router.get("/", async (req, res) => {
  console.log(req.payload);
  const rows = await Cliente.getAll();

  res.render("clientes/index", { clientes: rows });
});

// GET http://localhost:3000/clientes/new
router.get("/new", (req, res, next) => {
  res.render("clientes/formNew");
});

// GET http://localhost:3000/clientes/delete/:clienteId   ///// Delete
router.get("/delete/:clienteId", (req, res) => {
  Cliente.deleteById(req.params.clienteId)
    .then(result => {
      res.redirect("/clientes");
    })
    .catch(err => {
      console.log(err);
    });
});

// GET http://localhost:3000/clientes/delete/:clienteId   ///// Delete con async await
// router.get("/delete/:clienteId", async (req, res) => {

//   await Cliente.deleteById(req.params.clienteId);
//   res.redirect("/clientes");
// });

// GET http://localhost:3000/clientes/:clienteId // Al ser variable va la ultima
router.get("/:clienteId", (req, res) => {
  Cliente.getById(req.params.clienteId)
    .then(cliente => {
      res.render("clientes/detail", { cliente: cliente });
    })
    .catch(err => {
      console.log(err);
    });
});

/* MÉTODO EDIT */
router.put("/edit/:clienteId", (req, res) => {
  Cliente.edit(req.body, req.params.clienteId)
    .then(cliente => {
      res.render("clientes/formEdit", { cliente: cliente });
    })
    .catch(err => {
      console.log(err);
    });
});

/* MÉTODO CREATE */

// POST http://localhost:3000/clientes/create
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  const result = await Cliente.create({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    direccion: req.body.direccion,
    email: req.body.email,
    edad: req.body.edad,
    sexo: req.body.sexo,
    fecha_inscripcion: req.body.fecha_inscripcion,
    cuota: req.body.cuota,
    fecha_nacimiento: req.body.fecha_nacimiento,
    dni: req.body.dni
  });
  console.log(result);
  res.redirect("/clientes");
});

module.exports = router;
