const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const queriesC = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

    response.render('estudiantes/listado', {estudiantes}); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async(request, response) => {
    const carreras = await queriesC.obtenerTodasLasCarreras(); // Obtener la lista de carreras
    response.render('estudiantes/agregar', { carreras }); // Renderizamos el formulario con las carreras
});

// Endpoint para agregar un estudiante
router.post('/agregar', async(request, response) => {
    // Obtén los datos del estudiante desde el formulario
    const { nombre } = request.body; 
    const { apellido } = request.body;
    const { email } = request.body;
    const { idcarrera } = request.body;
    const { usuario } = request.body;

    if (nombre && apellido && email && idcarrera && usuario ) {
        const resultado = await queries.agregarEstudiante(nombre, apellido, email, idcarrera, usuario);
        if (resultado) {
            console.log('Estudiante agregado con éxito');
        } else {
            console.log('Error al agregar el estudiante');
        }
    } else {
        console.log('Todos los apartados son requeridos');
    }

    response.redirect('/estudiantes');
});

// Endpoint que permite mostrar el formulario para actualizar un nuevo estudiante
router.get('/actualizar/:idestudiante', async(request, response) => {
    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante); 
    const carreras = await queriesC.obtenerTodasLasCarreras();

    if (estudiante) {
        response.render('estudiantes/actualizar', { estudiante , carreras}); // Enviar los datos del estudiante
    } else {
        response.status(404).send('Estudiante no encontrado');
    }
});

// Endpoint para actualizar un estudiante
router.post('/actualizar/:idestudiante', async(request, response) => {
    const { idestudiante } = request.params;
    const { nombre } = request.body;
    const { apellido } = request.body;
    const { email } = request.body;
    const { idcarrera } = request.body;
    const { usuario } = request.body;
    const resultado = await queries.actualizarEstudiante(idestudiante, nombre, apellido, email, idcarrera, usuario);
    if(resultado > 0){
        console.log('Actualizado con exito');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async(request, response) => {
    const { idestudiante } = request.params; // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/estudiantes');
});

module.exports = router;
