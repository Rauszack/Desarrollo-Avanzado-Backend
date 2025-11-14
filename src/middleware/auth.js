import jwt from 'jsonwebtoken';

export const auth = (rolesPermitidos = []) => {
  return (req, res, next) => {
    // 1. Verificar que exista el header de autorización
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No hay usuarios antenticados' });
    }

    const token = authHeader.split(' ')[1]; // Extrae el token después de "Bearer"

    try {
      // 2. Verificar y decodificar el token
      const payload = jwt.verify(token, 'CoderCoder123'); 
      if (rolesPermitidos.length > 0) {
        if (!req.user.role || !rolesPermitidos.includes(req.user.role)) {
          return res.status(403).json({ error: 'No tienes permisos suficientes' });
        }
      }

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Token inválido' });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expirado' });
      }
      return res.status(500).json({ error: 'Error al autenticar token' });
    }
  };
};