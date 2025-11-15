import passport from "passport"
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
            if(contenidoToken.nombre=="Martin"){
                return done(null, false, {message:"El usuario Martin esta bloqueado"})
            }                
                return done(null, contenidoToken)
            } catch (error) {
                return done(error)
            }
        }
    ))
}  

export default initializePassport