const jwt = require("jsonwebtoken")


//                payload del token
const generarJWT = (uid, name) => {
    // en el cuerpo de la promesa se va a realizar el proceso de la generacion del JWT
    return new Promise((resolve, reject) => {
        const payload = {uid, name};
        //  el sign es para firmar el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            // tiempo de expiracion del token
            expiresIn:"2h"
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject("No se pudo generaqr el token")
            }
            resolve(token)
        })
    })

}

module.exports = {
    generarJWT
}