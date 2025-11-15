import { Router } from "express";
import passport from "passport";
import authentization from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/login',(req,res)=>{
    let {email, password}=req.body
    if(!email || !password) return res.status(400).send({error:'Ingrese email y password'})

    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

    let usuario=usuarios.find(u=>u.email===email)
    if(!usuario) return res.status(400).send({error:`Error credenciales`})
    
    if(!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({error:`Error credenciales`})

    // req.session.usuario=usuario

    delete usuario.password // eliminar datos sensibles
    let token=jwt.sign(usuario, "CoderCoder123", {expiresIn: "1h"})

    res.cookie("tokenCookie", token, {httpOnly: true})
    return res.status(200).json({
        usuarioLogueado:usuario,
        // token
    })

})

router.get("/logout", (req, res)=>{

    res.clearCookie("tokenCookie")
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Logout exitoso`});
})

router.get('/error', (req,res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:'No hay usuarios autenticados', detalle:'haga login'});
})

router.get('/usuario', passport.authenticate("current", {session:false}), (req,res)=>{


    res.setHeader('Content-Type','application/json');
    res.status(200).json({
        mensaje:'Perfil usuario '+req.user.nombre,
    });
});

export default router;
