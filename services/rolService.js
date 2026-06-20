import { where } from "sequelize";

class RolService {
    constructor(Rol){
    this.Rol= Rol;
    }

getAllRoles = async() =>{
    return await this.Rol.findAll();
};

getRolById = async(id) => {
    return await this.Rol.findByPk(id);
};

createRol = async(data)=>{
    if(!data.nombre) throw new Error("El nombre es obligatorio");
    return await this.Rol.create(data);
};

updateRol = async(id,data)=>{

    const rol = await this.Rol.findByPk(id);
    if(!rol) return 0;
    if(!data || Object.keys(data).length===0) throw new Error("No hay datos para actualizar");
    const mismosDatos=Object.keys(data).every(key => {
        return rol.getDataValue(key)===data[key];
    });
    if(mismosDatos) throw new Error("Los datos enviados son iguales a los actuales");
    await this.Rol.update(data,{
        where: {id},
        validate: true,
        individualHooks:true,
    });
    return await this.Rol.findByPk(id);
};

deleteRol = async(id) =>{
    return await this.Rol.destroy({where:{id}})
};
 
}
export default RolService;