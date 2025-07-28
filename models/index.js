import dbconfig from '../config/dbconfig.js';
import {Sequelize,DataTypes} from 'sequelize';
import transactionModel from './transactionModel.js';
import userModel from './userModel.js';

console.log(dbconfig)

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    port: dbconfig.PORT, 
    dialect: dbconfig.dialect,
    logging: false, 
    pool: {
        max: 5, // Maximum number of connections
        min: 0, // Minimum number of connections
        acquire: 60000,
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
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.log('Error:', err);
    });

const db = {
    Sequelize,
    sequelize,
    transactions:transactionModel(sequelize,DataTypes),
    users:userModel(sequelize,DataTypes),
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

await sequelize.sync({force:false});
console.log('Database re-synced')

export default db
