const userModel=(sequelize,DataTypes)=>{
    const User=sequelize.define("user",{
       name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }
    })
    return User 
}
export default userModel