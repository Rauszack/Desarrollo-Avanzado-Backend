import {Router} from "express"

class CustomRouter{
    #router

    constructor(){
        this.#router=Router()
        // this.nombre="Luis"
        this.init()
    }

    getRouter(){
        return this.#router
    }

    init(){}

    get(ruta="", ...funciones){   // ... son en este contexto el operador REST
        // this.#router.get(ruta, this.customResponses, funciones)
        this.#router.get(ruta, this.customResponses, this.procesafunciones(funciones))
    }


    // funciones=[(req, res, next)=>{}, (req, res, next)=>{}, (req, res)=>{}]

    procesafunciones=(funciones=[])=>{
        return funciones.map(fn=>{
            return async(...argumentos)=>{    // rest
                try {
                    return fn(...argumentos)    // spread
                } catch (error) {
                    return argumentos[1].internalServerError(error.message)
                }
            }
        })
    }


    customResponses(req, res, next){
        res.success=(message, data)=>res.status(200).json({status:"OK", message, data})
        res.badRequest=(error)=>res.status(400).json({status:"badRequest", error})
        res.internalServerError=(error)=>res.status(500).json({status:"internalServerError", error})

        next()
    }


}

export default CustomRouter;