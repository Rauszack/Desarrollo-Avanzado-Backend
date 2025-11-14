import passport from "passport"
import usuariosModelo from "../dao/models/usuarios.modelo.js"
import jwt from "passport-jwt"

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    let token = null;
    console.log(req.haders)
    if (req && req.cookies) {
        token = req.authorization.split('')[1]
    }
    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderClaveSecreta'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => { 
        let user = await userService.getById(id)
        done(null, user)
    })
}

export default initializePassport