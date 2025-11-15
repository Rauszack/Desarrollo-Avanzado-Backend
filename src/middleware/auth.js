import jwt from "jsonwebtoken";

const auth = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No hay usuarios autenticados", detalle:'haga login' });
    }

    const token = authHeader.split(" ")[1];
    let usuario
    try {
        usuario=jwt.verify(token, "CoderCoder123")
        req.user=usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales invalidas`, detalle: error.message})
    }

    next()
}
};

export default auth;