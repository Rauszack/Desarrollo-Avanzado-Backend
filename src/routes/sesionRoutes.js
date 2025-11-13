import { Router } from 'express';

const router = Router();

// Iniciar sesión y crear cookie de sesión
router.post('/login', (req, res) => {
  const { user, password } = req.query;
  
  // Logica de autenticación 
  if (user !== 'admin' || password !== '1234') {
    res.send("Usuario o contraseña incorrectos")
    } else {
        req.session.user = user
        req.session.admin = true
        res.send("Login Ok")
    }
});

//milddleware de autenticación
function auth (req, res, next) {
  if (req.session.user === 'admin' && req.session?.admin) {
    return next();
  }
  res.status(401).send('No estas autorizado');
}


router.get('/privado', auth, (req, res) => {
res.send("Bienvenido al area privada")
});

//cerrar sesión y destruir cookie de sesión
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.clearCookie("connect.sid")
            res.send("Logout ok")
        } else res.send({status: "Logout ERROR", body: err})
    })
});

export default router;