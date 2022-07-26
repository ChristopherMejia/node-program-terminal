const inquirer = require('inquirer');
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear Tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar Tarea`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

const inquirerMenu = async() => {

    console.clear()
    console.log("=======================".green);
    console.log(" Seleccione una opción ".white)
    console.log("=======================\n".green);

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion;
}

const pause = async() => {

    console.log('\n');
    const { continuar } = await inquirer.prompt([
        {
            type: 'input',
            name: 'continuar',
            message: `Presiona ${ 'Enter'.green } para continuar`,
        }
    ]);

    return continuar;
}


const leerInput = async( message ) => {
    const question =[
        {
            type: 'input',
            name: 'desc',
            message,
            validate ( value ) {
                if( value.length === 0){
                    return ' Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: `${tarea.id}`,
            name: `${ idx } ${ tarea.desc}`
        }
    })

    // Agregar al final del arreglo
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar',
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt( preguntas );

    return id;

}

const mostrarListadoCheckList = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: `${tarea.id}`,
            name: `${ idx } ${ tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}

const confirmar = async( message ) => {

    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(preguntas);

    return ok;
}


module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
}
