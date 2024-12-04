const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()

const app=express();

//middleware
app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routers

const router=require('./routes/transactionRouter.js')
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
