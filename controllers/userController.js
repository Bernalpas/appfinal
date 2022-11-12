const nodemailer = require('nodemailer');
require('dotenv').config();
const usersService = require('../services/usersService')
const user = new usersService();

//Lanza la página principal de la app
exports.dameUser = (req, res) => {
    res.render('index');
}

//buscar a los todos usuarios de la base de datos
exports.usuarios =  async (req, res) => {
    const allUsers = await user.getAllUser();
    res.render('usuarios', {
        allUsers
    });
}

//user por id
exports.actualizar = async (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    console.log(id, usuario);
    const updateId =  await user.updateUser(id, usuario)
    console.log(updateId);
    res.json(updateId)
}

// función para eliminar
exports.eliminar = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await user.delteUser(id)
    res.redirect('usuarios')
}


exports.formulario = (req, res) => {
    res.render('formulario', {
        titulo: 'Formulario para la carga de Usuarios' 
    });
}

exports.sucursales = (req, res) => {
    res.render('sucursales');
}

//Crear o insertar usuarios en la base de datos
exports.envioFormulario = async (req, res) => {
    const { nombre, email, address, age } = req.body;
    //llamamos al servicio 
    await user.createUser(req.body);
    console.log(`Tus datos son: ${nombre} - ${email} - ${address} - ${age}`);
    //nodemailer

    res.render('enviado', { 
        nombre: nombre,
        email: email,
        address: address,
        age: age
    })
}









