require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pause,
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList } = require('./helpers/inquire');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    // Cargar tareas
    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }

    do{
        // Imprimir el menu
       opt = await inquirerMenu();

       switch(opt){
            case '1':
                // Crear Tarea
                const desc = await leerInput('Descripción: ' );
                tareas.crearTarea( desc );
                break;
            case '2':
                // Mostrar Tareas 
                tareas.listadoCompleto();
                break;
            
            case '3':
                // Listar Tareas Completadas
                tareas.listarPendientesCompletadas( true );
                break;

            case '4':
                // Listar Tareas Incompletas
                tareas.listarPendientesCompletadas( false );
                break;
            
            case '5':
                // Completado | pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                break;
            
            case '6':
                // borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0'){
                    const ok = await confirmar('¿Estas Seguro?');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;

        }

       guardarDB( tareas.listadoArr );

       await pause();


    }while( opt !== '0' )
}

main();