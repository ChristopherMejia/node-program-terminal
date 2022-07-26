const fs = require('fs');

const archivo = "./dataFiles/data.json";

const guardarDB = ( data ) => {
    // convertir el objeto en formato string
    fs.writeFileSync( archivo, JSON.stringify(data));
}

const leerDB = () => {
    if( !fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync( archivo , {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}
 

module.exports = {
    guardarDB,
    leerDB
}