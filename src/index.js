const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars'); // Necesario para utilizar el motor de plantilla handlebars
const path = require('path');
// Inicializaciones
const app = express();

require('dotenv').config()

// Ajustes del servidor
app.set('port', process.env.PORT || 4500);
app.set('views', path.join(__dirname, 'views')); // Configuracion de la ruta donde se encuentran las vistas
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', // Configuracion del layout principal
    layoutsDir: path.join(app.get('views'), 'layouts'), // Configuracion de la ruta de los layouts
    extname: '.hbs' // Configura la extension que tendran los archivos HandleBars
}));

app.set('view engine', '.hbs'); // Configuracion para ejecutar el motor de plantilla

app.use(morgan('dev')); // Configurando el middleware morgan para visualizar que esta llegando al servidor
app.use(express.urlencoded({extended: false})); // Sirve para poder aceptar datos desde formularios

// Configuracion de ruta
app.use(require('./routes')); // Node automaticamente busca el index.js del modulo
app.use('/estudiantes', require('./routes/estudiantes')); // Configuracion de ruta para estudiantes
app.use('/carreras', require('./routes/carreras'));

// Archivos publicos (aca se coloca todo el codigo al cual el navegador puede acceder)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado en el puerto: ', app.get('port'));
});