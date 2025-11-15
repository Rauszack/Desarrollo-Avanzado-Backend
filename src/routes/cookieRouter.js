import { Router } from "express";

const router = Router();

router.get("/set/cookie", (req, res) => {
  res
    .cookie("Codercookie", "Cookie poderosa", {
      maxAge: 900000, // 15 minutos
      httpOnly: true,
    })
    .send("Cookie seteada");
});

router.get("/get/cookie", (req, res) => {
  const cookieValue = req.cookies.Codercookie;
  res.send(`Valor de la cookie: ${cookieValue}`);
});

router.get("/delete/cookie", (req, res) => {
  res.clearCookie("Codercookie").send("Cookie eliminada");
});

export default router;
