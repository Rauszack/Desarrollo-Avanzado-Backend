import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { generaHash, validaPass } from '../utils.js';

const router = Router();

router.post('/register',async(req,res)=>{
    let {nombre, email, password}=req.body
    // validaciones
    if(!nombre || !email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`nombre email password son requeridos`})
    }

    try {

        password=generaHash(password)

        let nuevoUsuario=await UsuariosManagerMongo.create({nombre, email, password})
        
        res.setHeader('Content-Type','application/json')
        res.status(200).json({message:`Registro exitoso`, nuevoUsuario})
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal server error`})
    }
    

})

router.post("/login", async(req, res)=>{
    let {email, password, web}=req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email | password son requeridos`})
    }

    try {
        let usuario=await UsuariosManagerMongo.getBy({email})
        if(!usuario){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        if(!validaPass(password, usuario.password)){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`Credenciales inválidas`})
        }

        delete usuario.password
        req.session.usuario=usuario

        if(web){
            return res.redirect("/perfil")
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Login exitoso para ${usuario.nombre}...!!!`});
        }

    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
})

router.get("/logout", (req, res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en proceso de logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso!"});
    })
})

export default router;