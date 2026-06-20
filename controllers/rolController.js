class rolController{
constructor(service){
    this.rolService=service;
}

getAllRoles = async(req,res,next)=>{
try{
    const roles = await this.rolService.getAllRoles();
    res.status(200).send({success:true,message:roles});
}catch(error){
    next(error);
}
};

getRolById = async(req,res,next)=>{
    try{
    const {id} = req.params;
        if(!id) throw new Error("ID requerido");
    const rol = await this.rolService.getRolById(id);
        if(!rol) throw new Error("Rol no encontrado");
    res.status(200).send({success:true,message:rol});;
    }catch(error){
        next(error);
    }
};

createRol = async(req,res,next)=>{
try{
    const {nombre} = req.body;
    if(!nombre) throw new Error("El nombre del rol es obligatorio")
    const rol = await this.rolService.createRol(req.body);
    res.status(201).send({ success: true, message: rol })
}catch(error){
    next(error);
}
};

updateRol = async(req,res,next)=>{
try{
    const {id} = req.params;
    if(!id) throw new Error("ID requerido");
    if(Object.keys(req.body).length===0) throw new Error("No hay datos para actualizar");
    const updated = await this.rolService.updateRol(id,req.body);
    if(!updated) throw new Error("Rol no encontrado");
    res.status(200).send({ success: true, message: updated });
}catch(error){
    next(error);
}
};

deleteRol = async(req,res,next)=>{
try{
    const {id} = req.params;
    if (!id) throw new Error("ID requerido");
    const deleted = await this.rolService.deleteRol(id);
    if(deleted===0) throw new Error("Rol no encontrado");
    res.status(200).send({ success: true, message: deleted });
}catch(error){
    next(error);
}
}
}
export default rolController;