const { response } = require("express");

const getEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "getEventos",
  });
};

const crearEvento = (req, res = response) => {
  res.json({
    ok: true,
    msg: "crearEventos",
  });
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
