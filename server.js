import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import router from "./routes/transactionRouter.js";

dotenv.config()
const app=express();

//middleware
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/Trader',router)

//testing api

app.get('/',(req,res)=>{
    res.json({message:'hello from api'})
})

//port

const PORT= process.env.PORT || 8000;

//server

app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`)
})
