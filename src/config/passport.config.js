import passport from "passport"
import local from "passport-local"
import { UsuariosManagerMongo } from "../dao/models/usuariosManagerMONGO.js"
import { generaHash, validaPass } from "../utils/util.js"    

export const initPassport=()=>{

    // paso 1
    passport.use("registro", new local.Strategy(
        {
            passReqToCallback:true, 
            usernameField: "email", 
        }, 
        async(req, username, password, done)=>{
            try {
                // logica autenticacion
                let {nombre}=req.body
                if(!nombre){
                    return done(null, false)  // 1
                }

                password=generaHash(password)

                let nuevoUsuario=await UsuariosManagerMongo.create({nombre, email: username, password})
                return done(null, nuevoUsuario)  // 2

            } catch (error) {
                return done(error)  // 3
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {usernameField:"email"}, 
        async(username, password, done)=>{
            try {
                // logica de autenticacion
                let usuario=await UsuariosManagerMongo.getBy({email: username})
                if(!usuario){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
                
                if(!validaPass(password, usuario.password)){
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(401).json({error:`Credenciales inválidas`})
                    return done(null, false)
                }
        
                delete usuario.password
                return done(null, usuario)
        
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1' o paso 1 bis (SOLO SI USO Sessions)
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario.email)
    })

    passport.deserializeUser(async(email, done)=>{
        let usuario=await UsuariosManagerMongo.getBy({email})
        return done(null, usuario)
    })
}