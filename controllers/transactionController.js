const { where } = require('sequelize');
const db=require('../models')
const Joi = require('joi');

//create main Model 

const Transaction = db.transactions


//main work

//1.create tranction

const addTransaction=async(req,res)=>{
    const schema = Joi.object({
        shopname: Joi.string().required(),
        items: Joi.string().required(),
        date: Joi.date().required(),
        payment: Joi.string().required(),
        amount: Joi.number().min(0).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ status: 400, message: "Bad input", error: error?.details[0]?.message?.replaceAll("\"", "")})

    let info = { 

        shopname: req.body.shopname,
        items: req.body.items,
        date: new Date(req.body.date),
        payment: req.body.payment,
        amount: req.body.amount
    }
    const tranction= await Transaction.create(info)
    res.status(200).send(tranction)
    console.log(tranction)
}

//2. get all transactuion

const getAlltransactions=async(req,res)=>{
    let transactions=await Transaction.findAll({})
    res.send(transactions)
}

//3.get one transaction

const Onetransaction=async(req,res)=>{
    let id=req.params.id
    let transactions=await Transaction.findOne({where:{id:id}})
    res.status(200).send(transactions)
}
//4. update

const Updatetransaction=async(req,res)=>{
    let id=req.params.id

    const transactions=await Transaction.update(req.body,{where:{id:id}})
    res.status(200).send(transactions)
}

//5.delete transaction

const deleteTransaction=async(req,res)=>{
    let id=req.params.id
    await Transaction.destroy({where:{id:id}})
    res.status(200).send('Transaction deleted');
}

//6.search

module.exports={
    addTransaction,
    getAlltransactions,
    Updatetransaction,
    deleteTransaction,
    Onetransaction
}