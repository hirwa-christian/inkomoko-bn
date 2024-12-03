const express=require('express')
const cors=require('cors')

const app=express();

//middleware
app.use(cors())
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

const PORT=8000

//server

app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`)
})
