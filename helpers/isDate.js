const moment = require("moment")


const isDate = (value) => {
    // si value no existe regresa false
    if(!value) {
        return false
    } 

    const fecha = moment(value)
    // si la fecha es valida (isValid es una funcion de moment) = true sin false
    if (fecha.isValid()) {
        return true
    } else return false
}

module.exports = {isDate}