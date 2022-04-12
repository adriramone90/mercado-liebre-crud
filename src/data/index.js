const {leerJson, escribirJson} = require("./read_write")


module.exports = {
    getProducts: leerJson("productsDataBase.json"),
    writeProducts: (data) => escribirJson("productsDataBase.json",data)
}

