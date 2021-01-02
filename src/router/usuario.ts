import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
const router = Router();

router.get('/usuario',(req:Request,res:Response)=>{
    
    const query = `SELECT * FROM usuarios`;
    
    MySQL.ejecutarQuery(query,(err:any, usuarios:object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
        }else{
            res.json({
                ok:true,
                usuarios
            });
        }
    });
});

router.get('/usuario/:id',(req:Request,res:Response)=>{
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id);


    const query = `SELECT * FROM usuarios where id = ${escapeId}`;
    
    MySQL.ejecutarQuery(query,(err:any, heroe:object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
            
        }else{
            res.json({
                ok:true,
                heroe:heroe[0]
            });
        }
    });
});

router.post('/usuario',(req:Request,res:Response)=>{

    const body = req.body;
    const escapeNombre =MySQL.instance.cnn.escape(body.nombre);
    const escapeApellidos =MySQL.instance.cnn.escape(body.apellidos);
    const escapeEmail =MySQL.instance.cnn.escape(body.email);
    const escapeEstado =MySQL.instance.cnn.escape(body.estado);
    const escapeRol =MySQL.instance.cnn.escape(body.rol);
    const escapeImg =MySQL.instance.cnn.escape(body.img);
    const escapePassword =MySQL.instance.cnn.escape(body.password);

    const query = `INSERT INTO usuarios(nombre,apellidos,email,estado,rol,img,password) VALUES 
    (${escapeNombre},${escapeApellidos},${escapeEmail},${escapeEstado},${escapeRol},${escapeImg},${escapePassword})`;

    let datos = {
        nombre:escapeNombre,
        Apellidos:escapeApellidos,
        email:escapeEmail,
        estado:escapeEstado,
        rol:escapeRol,
        img:escapeImg,
        password:escapePassword
    }
    MySQL.ejecutarQuery(query,(err:any, heroe:object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
            
        }else{
            res.json({
                ok:true,
                heroe:datos
            });
        }
    });
});
router.put('/usuario/:id',(req:Request,res:Response)=>{

    const body = req.body;
    const id = req.params.id;
    const escapeNombre =MySQL.instance.cnn.escape(body.nombre);
    const escapeApellidos =MySQL.instance.cnn.escape(body.apellidos);
    const escapeEmail =MySQL.instance.cnn.escape(body.email);
    const escapeEstado =MySQL.instance.cnn.escape(body.estado);
    const escapeRol =MySQL.instance.cnn.escape(body.rol);
    const escapeImg =MySQL.instance.cnn.escape(body.img);
    const escapePassword =MySQL.instance.cnn.escape(body.password);

    const query = `UPDATE usuarios SET nombre = ${escapeNombre}, apellidos = ${escapeApellidos}, email =  ${escapeEmail},
    estado =  ${escapeEstado}, rol =  ${escapeRol}, img =  ${escapePassword},img =  ${escapePassword} WHERE id = ${id}`;

    let datos = {
        nombre:escapeNombre,
        Apellidos:escapeApellidos,
        email:escapeEmail,
        estado:escapeEstado,
        rol:escapeRol,
        img:escapeImg,
        password:escapePassword
    }
    MySQL.ejecutarQuery(query,(err:any, heroe:object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
            
        }else{
            res.json({
                ok:true,
                heroe:datos
            });
        }
    });
});
router.delete('/usuario/:id',(req:Request,res:Response)=>{

    const id = req.params.id;
    const query = `DELETE FROM usuarios WHERE id = ${id}`;

    MySQL.ejecutarQuery(query,(err:any, heroe:object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
            
        }else{
            res.json({
                ok:true,
                heroe
            });
        }
    });
});

export default router;