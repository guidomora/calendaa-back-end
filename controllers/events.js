const { response } = require("express");
const Evento = require("../models/Evento");

const getEvento = async (req, res = response) => {

  // Para traer los eventos 
  const eventos = await Evento.find()
                              .populate("user", "name")

  // Agregamos los eventos a la res
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarEventos",
  });
};

const borrarEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "borrarEventos",
  });
};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  borrarEvento,
};
