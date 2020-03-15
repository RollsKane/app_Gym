var router = require("express").Router();

// Requiero el modelo
const Ejercicio = require("../models/ejercicio");

// Aquí irían los Middlewares

// GET http://localhost:3000/ejercicios
router.get("/", async (req, res) => {
  console.log(req.payload);
  const rows = await Ejercicio.getAll();

  res.render("ejercicios/index", { ejercicios: rows });
});

// GET http://localhost:3000/ejercicios/new
router.get("/new", (req, res, next) => {
  res.render("ejercicios/formNew");
});

// GET http://localhost:3000/ejercicios/edit
router.get("/edit", (req, res, next) => {
  res.send("ESTOY VIVO!");
});

// GET http://localhost:3000/ejercicios/delete/:ejercicioId   ///// Delete
router.get("/delete/:ejercicioId", (req, res) => {
  Ejercicio.deleteById(req.params.ejercicioId)
    .then(result => {
      res.redirect("/ejercicios");
    })
    .catch(err => {
      console.log(err);
    });
});

// GET http://localhost:3000/ejercicios/delete/:ejercicioId   ///// Delete con async await
// router.get("/delete/:ejercicioId", async (req, res) => {

//   await Ejercicio.deleteById(req.params.ejercicioId);
//   res.redirect("/ejercicios");
// });

// GET http://localhost:3000/ejercicios/:ejercicioId // Al ser variable va la ultima
router.get("/:ejercicioId", (req, res) => {
  Ejercicio.getById(req.params.ejercicioId)
    .then(ejercicio => {
      res.render("ejercicios/detail", { ejercicio: ejercicio });
    })
    .catch(err => {
      console.log(err);
    });
});

/* MÉTODO EDIT */
router.patch("/edit/:ejercicioId", async (req, res) => {
  try {
    const result = await Ejercicio.edit({
      titulo: req.body.titulo,
      duracion: req.body.duracion,
      repeticiones: req.body.repeticiones,
      id: req.params.Id
    });
    res.render("ejercicios/formEdit", { ejercicio: ejercicio });
  } catch (err) {
    console.log(err);
  }
});

// POST http://localhost:3000/ejercicios/create
router.post("/create", async (req, res, next) => {
  console.log(req.body);
  const result = await Ejercicio.create({
    titulo: req.body.titulo,
    duracion: req.body.duracion,
    repeticiones: req.body.repeticiones
  });
  console.log(result);
  res.redirect("/ejercicios");
});

module.exports = router;
