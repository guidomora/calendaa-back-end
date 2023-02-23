const {Schema, model} = require("mongoose")

// el schema seria la info que vamos a guardar en la bd
const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    // usuario que creo el registro
    user: {
        // esto seria una referencia
        type: Schema.Types.ObjectId,
        // aca aclaramos a donde hace la referencia
        ref: "Usuario",
        required: true
    }

})

EventoSchema.method("toJSON", function() {
   const {__v, _id, ...object} = this.toObject()
   object.id = _id;
   return object
})

module.exports = model("Evento", EventoSchema)