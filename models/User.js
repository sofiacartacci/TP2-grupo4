import { DataTypes,Model } from 'sequelize';
import sequelize from '../connection/sequelize';

import bycrypt from 'bcrypt';

class User extends Model {
    static validatePassword = async (passwordPlano,passwordHash) => {
        const isValid = await bycrypt.compare(passwordPlano,passwordHash)
    };
}

User.init(
    {
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [3.50],
            is: /^[a,z]+$/i,
        }
          },
    apellido:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [3.50],
            is: /^[a,z]+$/i,
        },
           },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rolId:{
        type:DataTypes.INTEGER,
        defaultValue: 2,
           },
    telefono: {
        type:DataTypes.STRING(15),
        allowNull:false,
        validate: {
            is:/^[0,9]+$/,
            len:[8,15],
        },
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement:true,
    },
    fechaNacimiento:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            isDate:true,
            isBefore: new Date().toISOString.split("T")[0]
        },
    },
    },
    {
        sequelize: sequelize,
        modelName: "User",
    },
);

User.beforeCreate(async(user)=>{
    const salt = await bycrypt.genSalt(10)
    const hash = await bycrypt.hash(user.password,salt) 
    user.password = hash;
})

export default User;