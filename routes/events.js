//  Aca creariamos todo el crud de los eventos
// Rutas de eventos /api/routes

const {Router} = require("express");
const { check } = require("express-validator");
const { getEvento, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jsw");
const router = Router()

// Cualquier peticion que se encuentre debajo de esta linea va a tener que revalidar el JWT
router.use(validarJWT);


// Todas las peticiones tienen que pasar por el JWT
// Obtenemos los eventos
router.get("/", getEvento);


// crear un nuevo evento
router.post("/",[
    check("title", "El titulo es obligatorio").not().isEmpty(),
    // el custom espera que le mandemos una funcion (una validacion personalizada)
    check("start", "Fecha de inicio obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion obligatoria").custom(isDate),
    validarCampos
] , crearEvento);


// actuliazar evento
router.put("/:id", actualizarEvento);

// Borrar evento
router.delete("/:id", borrarEvento);


module.exports = router