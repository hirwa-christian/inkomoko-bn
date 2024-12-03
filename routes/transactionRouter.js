const transactionController=require('../controllers/transactionController.js')
const userController=require('../controllers/userController.js')

const router=require('express').Router()
router.post('/addTransaction',transactionController.addTransaction)

//get all transaction
router.get('/getAlltransactions',transactionController.getAlltransactions)

//update transaction
router.put('/Updatetransaction/:id',transactionController.Updatetransaction)

//get single transaction
router.get('/getoneTransaction/:id',transactionController.Onetransaction)
router.delete('/deleteTransaction/:id',transactionController.deleteTransaction)
//user
router.post('/addUser',userController.addUser)

router.post('/Userlogin',userController.Userlogin)

//logout

router.post('/logoutuser',userController.logoutUser)

module.exports=router

