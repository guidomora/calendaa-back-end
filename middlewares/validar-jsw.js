const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  // Validacion si no hay token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }
  try {
    // Extraemos el payload para saber el uid del usuario
    // el verify pide el token y la secret public key
    const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
