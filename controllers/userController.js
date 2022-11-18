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
    const { 
        body
    } = req;

/*     const { nombre, email, address, age} = req.body

    console.log(nombre);
    console.log(email);
    console.log(address);
    console.log(age); 
    
*/

    let id = req.body.id[0]
    console.log(body);
    console.log(id);
    const updatedUser = await user.updateUser(id, body);
    console.log(updatedUser);
    res.render('index');
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
    if (nombre == '' && email == '') {
        res.render('formulario', {
            titulo: 'Por Favor llene los Datos Necesarios' 
        });
    }else{

        console.log(`Tus datos han sido recibidos: ${nombre} - ${email}`);

        //Envío de Email al Cliente
        async function envioMail(){
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USERGMAIL,
                    pass: process.env.PASSGMAIL 
                }
            });
            let mensaje = await transporter.sendMail({
                from: "bernalpas@gmail.com",
                to: `${email}`,
                subject: "Gracias por Comprar",
                html: ` ${nombre}, Muchas gracias por la compra realizada en 
                nuestros locales comenrciales. Te esperamos!!!`
            });
            res.render('enviado', { 
                nombre: nombre,
                email: email,
                address: address,
                age: age
            })
        }
        envioMail().catch(console.error)
    }
}

