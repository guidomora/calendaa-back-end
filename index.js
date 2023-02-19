// esto seria lo mismo a "import express from "express"
const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors")




// Podemos ver todos los precoesos que se estan corriendo
console.log(process.env);



// Crear el servidor de express
const app = express();



// Base de datos
dbConnection()


// CORS
app.use(cors())


// Directorio publico
// el use en express es conocido como un middleware
app.use(express.static("public"));




// Lectura y parseo del body
// las peticiones que venga en formato json, las procesamos y extraemos su contenido
app.use(express.json())



// Rutas
// todo lo que exporta el archivo auth.js, se va a habilitar en la ruta
//        ruta            ruta del archivo auth.js
app.use("/api/auth", require("./routes/auth"))




// Escuchar peticiones
// el 4000 seria el puerto en donde va a correr (se puede poner el que querramos)
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
