export const authAdmin=(req, res, next)=>{
    if(req.user.rol!="admin"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios para acceder a la ruta`})
    }

    next()
}

export const authUser=(req, res, next)=>{
    if(req.user.rol!="user"){
        res.setHeader('Content-Type','application/json');
        return res.status(403).json({error:`No tiene privilegios para acceder a la ruta`})
    }

    next()
}

export const auth=(permisos=[])=>{    // ["admiN", "user"]   |   ["PUBLIC"]    |   "["admin", "manager"]"
    return (req, res, next)=>{
        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")){
            return next()
        }

        if(!req.user || !req.user.rol){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados o hay problemas con el rol del usuario`})
        }

        if(!permisos.includes(req.user.rol.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
    }
}