require('colors');

const mostrarMenu = ( ) => {

    return new Promise( (resolve) => {
        console.clear()
        console.log("=======================".green);
        console.log(" Seleccione una opción ".red)
        console.log("=======================\n".green);
    
        console.log(` ${ '1.-'.green } Crear Tarea`);
        console.log(` ${ '2.-'.green } Listar Tareas`);
        console.log(` ${ '3.-'.green } Listar Tareas completadas`);
        console.log(` ${ '4.-'.green } Listar Tareas pendientes`);
        console.log(` ${ '5.-'.green } Completar tareas(s)`);
        console.log(` ${ '6.-'.green } Borrar tarea`);
        console.log(` ${ '0.-'.green } Salir \n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(' Selecciona una opción: ', (opt) => {
    
            readLine.close();
            resolve(opt)

        })
    })

}


const pausa = () => {
    return new Promise( (resolve) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question( `Presiona ${ 'Enter'.green } para continuar`, (opt) => {
            readline.close();
            resolve()
        });

    })
}

module.exports = {
    mostrarMenu,
    pausa
}