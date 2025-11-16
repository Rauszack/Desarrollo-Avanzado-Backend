class cookieController {
    static setCookies = (req, res) => {
  res
    .cookie("Codercookie", "Cookie poderosa", {
      maxAge: 900000, // 15 minutos
      httpOnly: true,
    })
    .send("Cookie seteada");
}

    static getCookies = (req, res) => {
  const cookieValue = req.cookies.Codercookie;
  res.send(`Valor de la cookie: ${cookieValue}`);
}
    static deleteCookies = (req, res) => {
  res.clearCookie("Codercookie").send("Cookie eliminada");
}
}

    export default cookieController;