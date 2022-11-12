const userModel = require('../models/userModels');

module.exports = class {
    //servicio que inserta usuarios en la db
    async createUser(user) {
        await userModel.create(user)
    }

    //servicio que busca a un usuario por id
    async getUser(id){
        return userModel.findById(id)
    }

    //servicio que busca a todos los usuarios
    async getAllUser(){
        return userModel.find();
    }

    //servicio que actualiza a los usuarios
    async updateUser(id, user){
        const userToUpdate = await userModel.findOneAndUpdate(id, user, {
            new: true,
        })
        return userToUpdate;
    }

    //servicio que elimina a los usuarios
    async delteUser(id){
        await userModel.findOneAndDelete(id)
    }
}

