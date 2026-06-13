import {generateToken,verifyToken} from "../utils/jwt.js"

class userService {

    constructor(user, rol){
        this.user=user;
        this.rol=rol;
    }

    getAllUsers = async () =>{
        const users = await this.user.findAll({
            attributes : ["id","nombre","apellido","email","rolId"],
            include: [{
                model: this.rol,
                attributes:["nombre"],
            },
            ],
        });
        return users;
    };

    getUserById = async () =>{
        const user = await this.user.findOne({
            where: {id},
            attributes: ["id","nombre","email","rolId"],
        })
        return user;
    };

    creteUser = async ({nombre,apellido,email,password,rolId,telefono,fechaNacimiento})=>{
        const user = await this.user.create({
        nombre,apellido,email,password,rolId,telefono,fechaNacimiento
        })
        return user;
    };

    updateUser = async ()=>{
        
    }

    deleteUser = async(id)=>{
    const deleted = await this.user.destroy({
        where:{id}
    })
    return deleted;
    };

    login = async(email,password) =>{
        const user = await this.user.findOne({
            where: {email},
            attributes:["id","nombre","apellido","email","password","rolId"]
        })
        if(!user) throw new Error("User not found");
        const validarPassword = await this.user.validarPassword(
            password,user.password,
        );
        if(!validarPassword) throw new Error("Invalid password");
        const payload = {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellido,
            rolId: user.rolId,
        }
        const token = generateToken(payload);
        return{toke,id: user.id}
    };

    me = async()=>{
        const user = verifyToken(payload);
        return user;
    };
}
export default userService;