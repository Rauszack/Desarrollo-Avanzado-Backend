import jwt from "jsonwebtoken";

export const auth = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No hay usuarios autenticados" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, "CoderCoder123");
      if (rolesPermitidos.length > 0) {
        if (!req.user.role || !rolesPermitidos.includes(req.user.role)) {
          return res
            .status(403)
            .json({ error: "No tienes permisos suficientes" });
        }
      }

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Token inválido" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expirado" });
      }
      return res.status(500).json({ error: "Error al autenticar token" });
    }
  };
};
