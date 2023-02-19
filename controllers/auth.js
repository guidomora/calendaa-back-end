const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  // desestructuramos, el req.body viene toda la info del usuario
  const { mail, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ mail });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar password
    // Como argunmento pide el numero de vueltas, mientras + vueltas mas compleja es la password, pero
    // mas pesado el porocesamiento, si lo dejamos vacio usa el valor 10 por defecto
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // para guardar en la db
    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token 
    });
  } catch {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ mail });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese correo",
      });
    }

    // Confirmar los passwords
    // Recibe la pass del usuario que acaba de escribir y lo compara con la pass de la bd,
    // si resulta exitoso arroja un true
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Passwords incorrecto",
      });
    }

    // Generar nuestro JWT (json web token)
    const token = await generarJWT(usuario.id, usuario.name)


    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const revalidarToken = async (req, res = response) => {
  const {uid, name} = req
 

  const token = await generarJWT(uid, name)

  res.json({
    ok: true,
    token
  });
};

// Ya que son varias exportaciones
module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
