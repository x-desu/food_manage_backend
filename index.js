import connectDb from "./lib/connectDb.js"
import express from "express"
import cors from 'cors'
import userRouter from './routes/user.route.js'
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js"
import menuRouter from "./routes/menu.route.js"
import orderRouter from "./routes/order.route.js"
import { authMiddleware } from "./middleware/auth.middleware.js"
const app = express()


app.use(express.json())
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["GET","POST","DELETE","PATCH","PUT"],
    credentials:true
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res,next)=>{
    res.status(200).json({health:"Health check"})
})

app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/menu',menuRouter)
app.use('/order',authMiddleware,orderRouter)

app.use((error,req,res,next)=>{
    res.status(error.status||500)
    res.json({
        message:error.message || "Something went wrong",
    })
})

app.listen(process.env.PORT,()=>{
    connectDb()
    console.log(`server started at: ${process.env.API_URL}`)
})