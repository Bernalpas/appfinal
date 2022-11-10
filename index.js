//Creamos constantes y requerimos las libreríasa
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const router = express.Router();
const routes = require('./routes/userRouter');
const { getConnection } = require('./dao/conexion');
require('dotenv').config();

//Llamar a la conexión
getConnection()
    .then((message) => {
        console.log(message);
    })
    .catch(console.log)

//Ejecutamos express y guardamos el puerto
const PORT = process.env.PORT || 8080;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes(router));

//Configuraciones
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Aplicación en escucha por el puerto asignado
app.listen(PORT, () => {
    console.log(`Aplicación activa y trabajando en el Puerto ${PORT}`);
});

//En caso de error, me avisa
app.on('Error', (err) => {
    console.log(`Tenemos un error en el Espacio`);
})
