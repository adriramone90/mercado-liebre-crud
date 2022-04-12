const fs = require("fs");
const path = require("path");

module.exports = {

    leerJson: (rutaJson)=>{return JSON.parse(fs.readFileSync(path.join(__dirname, rutaJson),"utf-8"))},

    escribirJson: (rutaJson, data)=> {return fs.writeFileSync(path.join(__dirname, rutaJson),JSON.stringify(data))}
}


