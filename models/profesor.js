/************ PROFESOR **************/
/************************************/
// Los modelos sirven para guardar o almacenar las funciones que van a interactuar con la base de datos

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from profesores", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pProfesorId => {
  return new Promise((resolve, reject) => {
    // cuando vaya un valor variable en la query, se pone ?
    // el segundo parámetro de la query es un array con tantos elementos como interrogaciones, para mostrar el valor variable
    db.query(
      "select * from profesores where id = ?",
      [pProfesorId],
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

const create = ({ nombre, experiencia }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into profesores (nombre, experiencia) values (?,?)",
      [nombre, experiencia],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pProfesorId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from profesores where id = ?",
      [pProfesorId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const edit = ({ nombre, experiencia }, profesorId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE profesores SET nombre = ?, experiencia = ? WHERE id = ?",
      [nombre, experiencia, profesorId],
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
