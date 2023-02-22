const {Schema, model} = require("mongoose")

// el schema seria la info que vamos a guardar en la bd
const UsuarioSchema = Schema({
    // como van a lucir nuestros usuarios
    name: {
        type: String,
        // significa que va a ser requerido
        required: true
    },
    mail: {
        type: String,
        required: true,
        // Unico
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = model("Usuario", UsuarioSchema)