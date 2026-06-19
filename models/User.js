import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";
import bcrypt from "bcrypt"; 
class User extends Model {
  static validatePassword = async (passwordPlano, passwordHash) => {
    const isValid = await bcrypt.compare(passwordPlano, passwordHash);
    return isValid;
  };
}

User.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty:{msg:"El nombre no puede estar vacío"},
        len: {args:[3, 50],msg:"El nombre debe tener entre 3 y 50 caractecteres"},
        is: {args:/^[a-z]+$/i,msg:"El nombre solo puede contener letras"},
      }
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty:{msg:"El apellido no puede estar vacío"},
        len:{args: [3, 50],msg:"El apellido debe tener entre 3 y 50 caractecteres"},
        is: {args: /^[a-z]+$/i,msg:"El apellido solo puede contener letras"},
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{msg:"El email ya esta registrado"},
      validate: {
        notEmpty:{msg:"El email no puede estar vacío"},
        isEmail: {msg:"El formato dde email no es valido"},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{msg:"La contraseña no puede estar vacía"},
        len: {args:[8],msg:"La contraseña debe tener mas de 8 caracteres"},
        is:{
          args:/^(?!\s+$).+/,
          msg:"La contraseña no puede ser solo espacios"
        },
      }
    },
    rolId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty:{msg:"El telefono no puede estar vacío"},
        is: {args:/^[0-9]+$/,msg:"El apellido debe tener entre 3 y 50 caractecteres"},
        len: {args:[8, 15], msg:"El largo del telefono debe estar entre 8 y 15 caracteres"}
      }
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty:{msg:"La fecha de nacimiento es obligatoria"},
        isDate: {msg:"La fecha de nacimiento deber ser una fecha válida"},
        isBefore:{ args:new Date().toISOString().split("T")[0],
                   msg:"La fecha de nacimiento deber ser anterior a hoy"}
      }
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
  },
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt); 
  user.password = hash;
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});





export default User;