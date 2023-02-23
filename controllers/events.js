const { response } = require("express");
const Evento = require("../models/Evento");

const getEvento = async (req, res = response) => {
  // Para traer los eventos
  const eventos = await Evento.find()
    // sirve para poedir que muestre lo que queramos
    // el name que esta dentro de user
    .populate("user", "name");

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

const actualizarEvento = async (req, res = response) => {
  // el id del evento
  const eventoId = req.params.id;

  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return  res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }


    // validacion para que solo el usuario de ese evento pueda modificar el evento
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene autorizacion para editar este evento"
      })
    }

    // desestructuramos todo lo nuevo que trae la request y le agregamos el id
    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    // actualizacion del evento
    // para ver el cambio directamente agregamos el 3er argumento {new: true}
    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})
    res.json({
      ok: true,
      evento : eventoActualizado
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

};

const borrarEvento = async (req, res = response) => {
  // Practimanete igual al de actualizar

  const eventoId = req.params.id;
  const uid = req.uid

  try {
    const evento = await Evento.findById( eventoId );
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene autorizacion para eliminar este evento"
      })
    }

    await Evento.findByIdAndDelete(eventoId)

    res.json({ok: true})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  borrarEvento,
};
