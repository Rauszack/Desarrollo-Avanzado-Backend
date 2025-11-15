import dotenv from "dotenv"

dotenv.config({path:"./.env", override:true, quiet: true})


export const config={
    database:{
        URI_MONGODB: process.env.URI_MONGODB, 
        DB_NAME: process.env.DB_NAME, 
    }, 
    general: {
        PORT:process.env.PORT, 
        COOKIE_SECRET: process.env.COOKIE_SECRET
    },
}