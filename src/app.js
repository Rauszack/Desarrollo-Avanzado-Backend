import express from "express";
import path from "path";
import fs from 'fs';
import cookieParser from "cookie-parser";
import cookieRouter from "./routes/cookieRouter.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { router as petsRouter } from "./routes/petsRouter.js";

import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import __dirname from "./utils/constantsUtil.js";
import websocket from "./websocket.js";
import UsersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectMongoDB();


let usuarios=[]
if(fs.existsSync('./src/usuarios.json')){
    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf-8'))
}

const usersRouter = new UsersRouter().getRouter();

app.use('/api/users', usersRouter); 

//Handlebars Config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "./views");
app.set("view engine", "handlebars");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET || "fallbackSecret"));

initializePassport();
app.use(passport.initialize());

//Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/api/cookies", cookieRouter);
app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);

// Ruta de prueba básica (este endpoint conecta)
app.get("/api/cookies", (req, res) => {
  res.json({ message: "Cookies endpoint working!" });
});

// Manejo de errores 404
app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);
