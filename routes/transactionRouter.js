
import transactionController from "../controllers/transactionController.js"
import userController from "../controllers/userController.js"
import express from "express"
const router = express.Router();
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

export default router

