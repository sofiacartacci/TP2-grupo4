class userController{ 

    constructor(service){
        this.userService = service;
    }

getAllUsers = async (req,res)=>{
    try {
        const users = await this.userService.getAllUsers();
        res.status(200).send({success: true , message: users})
    } catch(error){
        res.status(400).send({success: false , message:error.message});
    }
};

getUserById = async (req,res)=>{
    try{
        const {id}=req.params
        const user = await this.userService.getUserById(id)
        res.status(200).send({success: true , message: user})
    }catch(error){
        res.status(400).send({success: false , message:error.message})
    }
};

createUser = async (req,res)=>{
    //TODO revisar throw error
    try{
    const requiered = ["nombre", "apellido", "email", "password", "telefono", "fechaNacimiento"];
    for (const field of requiered){
        if(!req.body[field]) throw new Error(`${field} is required`)
    }
    const user = await this.userService.createUser(req.body);
        res.status(200).send({success: true, message: user})
    }catch(error){
        res.status(400).send({success: false , message:error.message})
}
};

updateUser = async (req,res)=>{
    //TODO 
};

deleteUser = async (req,res)=>{

    ///TODO 
    try{
        const {id} = req.params;
        if(!id) throw new Error("Id obligatorio");
        const deleted = await this.userService.deleteUser(id);
         if(deleted === 1){
             res.status(200).send({success: true , message: deleted})
         }
         else{
            throw new Error("No se borro el usuario")
         }
    }catch(error){
        res.status(400).send({success: false , message:error.message});
    }
};

login = async (req,res)=>{
    try{
        const { email , password} = req.body;
        const user = await this.userService.login({email,password});
        res.cookies("payload",user.token)
        res.status(200).send({success: true , message:user.id})
    }catch(error){
        res.status(400).send({success: false , message:error.message})   
    }

};

me = async (req,res)=>{
    try{
        const {payload} = req.cookies
        const user = await this.userService.me(payload);
        res.status(200).send({success: true , message:user})
    }catch(error){
        res.status(400).send({success: false , message:error.message})
    }
};

}

export default userController;