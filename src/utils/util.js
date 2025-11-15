import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const generaHash=password=>bcrypt.hashSync(password, 10)
export const validaPass=(pass, hash)=>bcrypt.compareSync(pass, hash)

export const passportCall=estrategia=>function(req, res, next) {
  passport.authenticate(estrategia, function(err, user, info, status) {
    if (err) { return next(err); }
    if (!user) { 
        return res.status(401).json({ error: info.mesage?info.mesage:info.toString() });//si no hay usuario autenticado, envio error 401
     }
    res.redirect('acount');
  })(req, res, next);
};
