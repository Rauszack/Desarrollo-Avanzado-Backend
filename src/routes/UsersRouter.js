import CustomRouter from './customRouter.js';

class UsersRouter extends CustomRouter{
    init(){
        this.get("/", (req, res)=>{

            let {numero}=req.query
            if(+numero>100){

                return res.badRequest(`El número ${numero} es inválido`)
            }

            if(+numero==20){

                throw new Error("Error de prueba...!!!")
            }

            let usuarios=[
                {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
                {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
                {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
            ]

            // res.setHeader('Content-Type','application/json');
            // return res.status(200).json({usuarios});

            res.success(`Listado de usuarios`, usuarios)
        })


    }
}

export default UsersRouter;