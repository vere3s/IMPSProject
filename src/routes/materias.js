const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Endpoint para mostrar todos las materias
router.get('/', async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();

    response.render('materias/listado', {materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar una nueva materia
router.get('/agregar', async(request, response) => {
    response.render('materias/agregar'); // Renderizamos el formulario
});

// Endpoint para agregar una materia
router.post('/agregar', async(request, response) => {
    const { materia } = request.body; // Obtén el nombre de la materia desde el formulario

    if (materia) {
        const resultado = await queries.agregarMateria(materia);
        if (resultado) {
            console.log('Materia agregada con éxito');
        } else {
            console.log('Error al agregar la materia');
        }
    } else {
        console.log('El nombre de la materia es requerido');
    }

    response.redirect('/materias');
});

// Endpoint que permite mostrar el formulario para actualizar una nueva materia
router.get('/actualizar/:idmateria', async(request, response) => {
    const { idmateria } = request.params;
    const materia = await queries.obtenerMateriaPorId(idmateria);

    if (materia) {
        response.render('materias/actualizar', { materia }); // Renderiza el formulario y pasa la materia actual para prellenar los datos
    } else {
        response.status(404).send('Materia no encontrada');
    }
});

// Endpoint para actualizar una materia
router.post('/actualizar/:idmateria', async(request, response) => {
    const { idmateria } = request.params;
    const { materia } = request.body;
    const resultado = await queries.actualizarMateria(idmateria, materia);
    if(resultado > 0){
        console.log('Actualizado con exito');
    }
    response.redirect('/materias');
});

// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria', async(request, response) => {
    const { idmateria } = request.params;  // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const resultado = await queries.eliminarMateria(idmateria);
    if(resultado > 0){
        console.log('Eliminado con éxito');
    }
    response.redirect('/materias');
});

module.exports = router;
