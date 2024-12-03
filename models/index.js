const dbconfig=require('../config/dbconfig.js');

const {Sequelize,DataTypes}=require('sequelize')

const sequelize=new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
        host:dbconfig.HOST,
        dialect:dbconfig.dialect
    }
)
sequelize.authenticate()
.then(()=>{
    console.log('connectesd')
})
.catch(err=>{
    console.log('Error'+err)
})
const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

db.transactions=require('./transactionModel.js')(sequelize,DataTypes)
db.users=require('./userModel.js')(sequelize,DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log('yes re-syn done!')
})


module.exports=db