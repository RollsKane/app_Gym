var router = require("express").Router();

// Requiero el modelo
const Profesor = require("../models/profesor");

// Aquí irían los Middlewares

// GET http://localhost:3000/profesores
router.get("/", async (req, res) => {
  console.log(req.payload);
  const rows = await Profesor.getAll();

  res.render("profesores/index", { profesores: rows });
});

// GET http://localhost:3000/profesores/new
router.get("/new", (req, res, next) => {
  res.render("profesores/formNew");
});

// GET http://localhost:3000/profesores/edit
router.get("/edit", (req, res, next) => {
  res.send("ESTOY VIVO!");
});

// GET http://localhost:3000/profesores/delete/:profesorId   ///// Delete
router.get("/delete/:profesorId", (req, res) => {
  Profesor.deleteById(req.params.profesorId)
    .then(result => {
      res.redirect("/profesores");
    })
    .catch(err => {
      console.log(err);
    });
});

// GET http://localhost:3000/profesores/delete/:profesorId   ///// Delete con async await
// router.get("/delete/:profesorId", async (req, res) => {

//   await Profesor.deleteById(req.params.profesorId);
//   res.redirect("/profesores");
// });

// GET http://localhost:3000/profesores/:profesorId // Al ser variable va la ultima
router.get("/:profesorId", (req, res) => {
  Profesor.getById(req.params.profesorId)
    .then(profesor => {
      res.render("profesores/detail", { profesor: profesor });
    })
    .catch(err => {
      console.log(err);
    });
});

// POST http://localhost:3000/profesores/create
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  const result = await Profesor.create({
    nombre: req.body.nombre,
    experiencia: req.body.experiencia
  });
  console.log(result);
  res.redirect("/profesores");
});

module.exports = router;
