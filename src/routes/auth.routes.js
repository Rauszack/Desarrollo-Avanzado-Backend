import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email == "coder@coder.com" && password == "coderpass") {
        let token = jwt.sign({ email, password, role: 'user' }, 'coderClaveSecreta  ', { expiresIn: '1h' });
        res.send({ message: "Inicio de sesion exitoso", token })
    }

router.get('/current', passport.authenticate('jwt'), authentization('user'), (req, res) => {
        res.send(req.user);
    })
});

export default router;