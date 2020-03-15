/************ CLIENTE ************/
/**********************************/
// Los modelos sirven para guardar o almacenar las funciones que van a interactuar con la base de datos

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from clientes", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getById = pClienteId => {
  return new Promise((resolve, reject) => {
    // cuando vaya un valor variable en la query, se pone ?
    // el segundo parámetro de la query es un array con tantos elementos como interrogaciones, para mostrar el valor variable
    db.query(
      "select * from clientes where id = ?",
      [pClienteId],
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

const create = ({
  nombre,
  apellidos,
  direccion,
  email,
  edad,
  sexo,
  cuota,
  fecha_nacimiento,
  dni
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into clientes (nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni ) values (?,?,?,?,?,?,?,?,?,?)",
      [
        nombre,
        apellidos,
        direccion,
        email,
        edad,
        sexo,
        new Date(),
        cuota,
        fecha_nacimiento,
        dni
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = pClienteId => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from clientes where id = ?",
      [pClienteId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const edit = (
  {
    nombre,
    apellidos,
    direccion,
    email,
    edad,
    sexo,
    fecha_inscripcion,
    cuota,
    fecha_nacimiento,
    dni,
    fk_profesor
  },
  clienteId
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE clientes SET nombre = ?, apellidos = ?, direccion = ?, email = ?, edad = ?, sexo = ?, fecha_inscripcion = ?, cuota = ?, fecha_nacimiento = ?, dni = ?, fk_profesor = ? WHERE id = ?",
      [
        nombre,
        apellidos,
        direccion,
        email,
        edad,
        sexo,
        fecha_inscripcion,
        cuota,
        fecha_nacimiento,
        dni,
        fk_profesor,
        clienteId
      ],
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
