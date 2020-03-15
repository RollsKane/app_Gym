/************ EJERCICIO ************/
/************************************/
// Los modelos sirven para guardar o almacenar las funciones que van a interactuar con la base de datos

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from ejercicios", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pEjercicioId => {
  return new Promise((resolve, reject) => {
    // cuando vaya un valor variable en la query, se pone ?
    // el segundo parámetro de la query es un array con tantos elementos como interrogaciones, para mostrar el valor variable
    db.query(
      "select * from ejercicios where id = ?",
      [pEjercicioId],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows[0]);
      }
    );
  });
};

const create = ({ titulo, duracion, repeticiones }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into ejercicios ( titulo, duracion, repeticiones ) values (?,?,?)",
      [titulo, duracion, repeticiones],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pEjercicioId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from ejercicios where id = ?",
      [pEjercicioId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const edit = ({ titulo, duracion, repeticiones }, ejercicioId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE ejercicios SET titulo = ?, duracion = ?, repeticiones = ? WHERE id = ?",
      [titulo, duracion, repeticiones, ejercicioId],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  deleteById: deleteById,
  edit: edit
};
