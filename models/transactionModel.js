const transactionModel=(sequelize,DataTypes)=>{
    const Transaction=sequelize.define("transaction",{
        items:{
            type:DataTypes.STRING,
            allowNull:false
        },
        shopname:{
            type:DataTypes.STRING
        },
        date:{
            type:DataTypes.DATE
        },
        payment:{
            type:DataTypes.STRING
        },
        amount:{
            type:DataTypes.FLOAT
        }
    })
    return Transaction
}
export default transactionModel