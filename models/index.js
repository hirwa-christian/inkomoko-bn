const dbConfig=require('../config/dbconfig.js');
console.log(dbConfig)
const {Sequelize,DataTypes}=require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT, // Use the port from the config
    dialect: dbConfig.dialect,
    logging: false, // Optional: Disable logging for cleaner output
    pool: {
        max: 5, // Maximum number of connections
        min: 0, // Minimum number of connections
        acquire: 60000, // Maximum time (ms) Sequelize will try to get a connection
        idle: 10000, // Maximum time (ms) a connection can be idle before being released
    },
    retry: {
        max: 5, // Maximum number of retries before failing
    },
    dialectOptions: {
        connectTimeout: 60000, // Timeout for establishing a connection (in ms)
    },
});
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