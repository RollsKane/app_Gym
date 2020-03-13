/*** DATABASE ***/

const mysql = require("mysql"); // requiriendo libreria mysql

// cualquier DB que hagamos, serían estas mismas líneas
// exports.connect = () => {
//   const pool = mysql.createPool({
//     host: "127.0.0.1", // aquí se pone el servidor que nos sirve esa DB
//     user: "root",
//     password: "",
//     port: 3306,
//     database: "escuelav2"
//   });

exports.connect = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });

  global.db = pool; // en cualquier punto de mi app donde yo acceda a db, me devuelve el pool de conexiones
};
