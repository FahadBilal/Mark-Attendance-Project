import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"));

app.use(express.json({limit:"16kb"}));
app.use(cookieParser());


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:"true"
}));


// Import userRoute

import userRouter from './routes/user.routes.js'

app.use("/api/v1/users",userRouter)

// Admin route
import adminRouter from './routes/admin.route.js'

app.use("/api/v1/admin",adminRouter);









export {app}
