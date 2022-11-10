const userController = require('../controllers/userController');
//Rutas 

module.exports = (router) => {
    router
        .get('/', userController.dameUser)
        .get('/usuarios', userController.usuarios)
        .patch('/usuarios/:id', userController.actualizar)
        .get('/formulario', userController.formulario)
        .get('/sucursales', userController.sucursales)
        .post('/formulario', userController.envioFormulario)
        .delete('/delete/:id', userController.eliminar)
    return router;
}
