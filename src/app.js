import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cookieRouter from "./routes/cookieRouter.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import __dirname from "./utils/constantsUtil.js";
import websocket from "./websocket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectMongoDB();

const engine = handlebars.engine;
//Handlebars Config
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/../views");
app.set("view engine", "handlebars");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET || "fallbackSecret"));
app.use;

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

//Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/api/cookies", cookieRouter);

// Ruta de prueba básica
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
