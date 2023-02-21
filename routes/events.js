//  Aca creariamos todo el crud de los eventos
// Rutas de eventos /api/routes

const {Router} = require("express");
const { getEvento, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jsw");
const router = Router()

// Cualquier peticion que se encuentre debajo de esta linea va a tener que revalidar el JWT
router.use(validarJWT);


// Todas las peticiones tienen que pasar por el JWT
// Obtenemos los eventos
router.get("/", validarJWT, getEvento);


// crear un nuevo evento
router.post("/", validarJWT, crearEvento);


// actuliazar evento
router.put("/:id", validarJWT, actualizarEvento);

// Borrar evento
router.delete("/:id", validarJWT, borrarEvento);


module.exports = router