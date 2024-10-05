const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();

    response.render('carreras/listado', {carreras}); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async(request, response) => {
    response.render('carreras/agregar'); // Renderizamos el formulario
});

// Endpoint para agregar una carrera
router.post('/agregar', async(request, response) => {
    const { carrera } = request.body; // Obtén el nombre de la carrera desde el formulario

    if (carrera) {
        const resultado = await queries.agregarCarrera(carrera);
        if (resultado) {
            console.log('Carrera agregada con éxito');
        } else {
            console.log('Error al agregar la carrera');
        }
    } else {
        console.log('El nombre de la carrera es requerido');
    }

    response.redirect('/carreras');
});

// Endpoint que permite mostrar el formulario para actualizar una nueva carrera
router.get('/actualizar/:idcarrera', async(request, response) => {
    const { idcarrera } = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera);

    if (carrera) {
        response.render('carreras/actualizar', { carrera }); // Renderiza el formulario y pasa la carrera actual para prellenar los datos
    } else {
        response.status(404).send('Carrera no encontrada');
    }
});

// Endpoint para actualizar una carrera
router.post('/actualizar/:idcarrera', async(request, response) => {
    const { idcarrera } = request.params;
    const { carrera } = request.body;
    const resultado = await queries.actualizarCarrera(idcarrera, carrera);
    if(resultado > 0){
        console.log('Actualizado con exito');
    }
    response.redirect('/carreras');
});

// Endpoint que perite eliminar una carrera
router.get('/eliminar/:idcarrera', async(request, response) => {
    const { idcarrera } = request.params;  // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idcarrera
    const resultado = await queries.eliminarCarrera(idcarrera);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/carreras');
});

module.exports = router;
