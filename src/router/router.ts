import {Router, Request, Response} from 'express';
import MySQL from '../mysql/mysql';
const router = Router();

router.get('/heroes',(req:Request,res:Response)=>{
    
    const query = `SELECT * FROM heroes`;
    
    MySQL.ejecutarQuery(query,(err:any, heroes:object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false,
                error:err
            });
        }else{
            res.json({
                ok:true,
                heroes
            });
        }
    });
});

router.get('/heroes/:id',(req:Request,res:Response)=>{
    const id = req.params.id;
    const escapeId = MySQL.instance.cnn.escape(id);


    const query = `SELECT * FROM heroes where id = ${escapeId}`;
    
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

router.post('/heroes',(req:Request,res:Response)=>{

    const body = req.body;
    const escapeNombre =MySQL.instance.cnn.escape(body.nombre);
    const escapePoder =MySQL.instance.cnn.escape(body.poder);

    const query = `INSERT INTO heroes(nombre,poder) VALUES (${escapeNombre},${escapePoder})`;

    let datos = {
        nombre: escapeNombre,
        poder:escapePoder
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
router.put('/heroes/:id',(req:Request,res:Response)=>{

    const body = req.body;
    const id = req.params.id;
    const escapeNombre =MySQL.instance.cnn.escape(body.nombre);
    const escapePoder =MySQL.instance.cnn.escape(body.poder);

    const query = `UPDATE heroes SET nombre = ${escapeNombre}, poder = ${escapePoder} WHERE id = ${id}`;

    let datos = {
        nombre: escapeNombre,
        poder:escapePoder
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
router.delete('/heroes/:id',(req:Request,res:Response)=>{

    const id = req.params.id;
    const query = `DELETE FROM heroes WHERE id = ${id}`;

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