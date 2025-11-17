import { usuariosModelo } from "./models/users.model.js"

console.log("Persistencia en MONGODB iniciada")

export class usersMongoDAO{
    constructor(){}

    async get(){
        return await usuariosModelo.find().lean()
    }

    async getBy(filtro={}){
        return await usuariosModelo.findOne(filtro).lean()
    }

    async create(usuario){
        let usuarioNuevo=await usuariosModelo.create(usuario)
        return usuarioNuevo.toJSON()
    }
}