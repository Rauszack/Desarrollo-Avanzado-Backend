import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cookieRouter from './routes/cookieRouter.js';
import sessionsRouter from './routes/sessionsRouter.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import MongoStore from 'connect-mongo';
import dotenv from "dotenv";
import connectMongoDB from './config/db.js';
import passport from 'passport';
import { initPassport } from './config/passport.config.js';

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

const engine = handlebars.engine; 
//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./src/public'));
app.use(cookieParser(process.env.COOKIE_SECRET || 'fallbackSecret'));
app.use(session({
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: false,    
    cookie: { 
        maxAge: 60000, 
        httpOnly: true
    },
    store: MongoStore.create({
        mongoUrl: process.env.URI_MONGODB,
        dbName: 'Coder-Cluster0',
        ttl: 60 * 10
    })
}));

initPassport()
app.use(passport.initialize())
app.use(passport.session())  // SOLO SI USO Sessions

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use("/api/sessions", sessionsRouter)
app.use('/', viewsRouter)


//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/api/cookies', cookieRouter);
app.use('/api/sessions', session);

const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);