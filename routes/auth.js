// Rutas de usuarios / auth
// host + /api/auth

const { Router } = require("express");

// middleware que se va a encargar de validar un campo en particular
const {check} = require("express-validator")
const router = Router();

const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

// Luego del router viene el tipo de peticion que esperamos, el callback que nos pide despues del "/"
// es la request y la response
// router.post("/new", (req, res) => {
//     res.json({
//         ok:true,
//         msg: "login"
//     })
// })
// Se pueden hacer como la de aca arriba
router.post("/new", 
// un array de middlewares
[
  // necesito el name    msg de error       no   este vacio
  check("name", "El nombre es obligatorio").not().isEmpty(),
  // Tiene que ser un email
  check("mail", "El mail es obligatorio").isEmail(),
  check("password", "La password debe ser de 6 caracteres").isLength({min: 6}),
  validarCampos
],
crearUsuario);

router.post("/",
[
  // Tiene que ser un email
  check("mail", "El mail es obligatorio").isEmail(),
  check("password", "La password debe ser de 6 caracteres").isLength({min: 6}),
  validarCampos
], 
loginUsuario);

router.get("/renew", revalidarToken);

//  Exportacion en node
module.exports = router;
