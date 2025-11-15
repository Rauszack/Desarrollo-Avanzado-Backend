import passport from "passport"
import usuariosModelo from "../dao/models/usuarios.modelo.js"
import passportjwt from "passport-jwt"
import jwt from "jsonwebtoken"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const buscaToken = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.authorization.split('')[1]
    }
    return token
}

const initializePassport = () => {
  passport.use("current", new passportjwt.Strategy(
        {
            secretOrKey: "CoderCoder123", 
            jwtFromRequest: passportjwt.ExtractJwt.fromExtractors([buscaToken])
        }, 
        async(contenidoToken, done)=>{
            try {
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => { 
        let user = await userService.getById(id)
        done(null, user)
    })
}

export default initializePassport