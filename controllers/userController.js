const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Joi=require('joi');
const { where } = require('sequelize');
const { use } = require('../routes/transactionRouter');
const saltRounds=10;
const User=db.users

//add user

const addUser=async(req,res)=>{
    let schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required()
      })
      const {error}=schema.validate(req.body)
      if(error) return res.status(400).json({status: 400, message:'Bad input'})
    try {
      const hashedPassword=await bcrypt.hash(req.body.password,saltRounds)

      let data={
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword //hasshedpassword
       }

       //create user in the database

       const user=await User.create(data)
       res.status(200).send(user)
      
    } catch (error) {
      res.status(500).json({status:500, message:'server is error'})
    }

}

  const logoutUser=(req,res)=>{
    res.status(200).json({message:'Logout successifuly'});
  }

    //user login
    const Userlogin=async(req,res)=>{
      const{email,password}=req.body

      try {
        //Find user by email
        const user=await User.findOne({where:{email}})
        if (!user) {
          return res.status(400).json({status:404,message:'user not found'})
        }

        //compare password

        const isPasswordvalid=await bcrypt.compare(password,user.password);
        if (!isPasswordvalid) {
          return res.status(401).json({status:401,message:'Invalid Password'})
        }
        
        //Generate a JWT token

        const token=jwt.sign({id: user.id, email: user.email},process.env.SECRET,{
          expiresIn:'1h'
        });
        return res.status(200).json({status:200,message:'Login successfuly',token});

      } catch (error) {
        res.status(500).json({status:500,message:'Server error',error:error.message})
      }
    
    }
    
             
    

module.exports={
  addUser,
  Userlogin,
  logoutUser
}