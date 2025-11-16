import { Router } from 'express';
import { controllerHandler, midd01, midd02, midd03, midd04 } from '../middlewares/middlewares.js';
export const router = Router()

router.get('/', (req, res) => {



    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ pets: "Pets" })
})

const funciones=[midd01, midd02, midd03, midd04, controllerHandler]

router.get("/prueba", funciones)

router.get('/listarformateado', (req, res) => {



    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ pets: "Pets formateado" })
})

router.post(
    "/",
    (req, res, next)=>{
        console.log(`Middleware 1`)
        next()
    }, 
    midd03, 
    (req, res) => {

        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ payload: "Nueva mascota generadao" });
    }
)