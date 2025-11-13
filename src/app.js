import express from 'express';
import cookieParser from 'cookie-parser';
import cookieRoutes from './routes/cookieRoutes.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import connectMongoDB from './config/db.js';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js'
import session from 'express-session';

dotenv.config();

const app = express();
const PORT = process.env.PORT; 

connectMongoDB();

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET || 'fallbackSecret'));
app.use(session({
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: false,    
    cookie: { 
        maxAge: 60000, 
        httpOnly: true
    }
}));

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/api/cookies', cookieRoutes);
app.use('/api/sessions', session);

const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);