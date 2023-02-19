const { response } = require("express");
const {validationResult} = require("express-validator")

// el next se encarga de que se pase al siguiente middleware (en auth routes), si todo sale bien
const validarCampos = (req, res = response, next) => {

  // Sin express validator
  // if (name.length < 4) {
  //     return res.status(400).json({
  //         ok: false,
  //         msg: "El nombre debe ser mayor a 3 letras"
  //     })
  // }

  // Manejo de errores
  const errors = validationResult(req);
  // Si hay errores
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};


// Lo exportamos
module.exports = {
    validarCampos
}
