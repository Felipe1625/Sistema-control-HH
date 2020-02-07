import {Request,Response} from 'express';

import pool from '../database';

class PuestoTrabajadorController{ 

     //list -> list all puestotrabajador

     public async list(req:Request,res:Response){
          const puestotrabajadores=await pool.query('SELECT * FROM puestotrabajador');
          res.json(puestotrabajadores);
     }

     //getOne -> list one puestotrabajador
     public async getOne(req:Request,res:Response):Promise<any>{
          const puestotrabajador=await pool.query('SELECT * FROM puestotrabajador WHERE IdPuestoTrabajador=?',[req.params.id]);
          if(puestotrabajador.length > 0){
               return res.json(puestotrabajador[0]);
          }
          res.status(404).json({text:'puestotrabajador not founding'});
     }

     //metodo create -> insert puestotrabajador
     public async create(req:Request,res:Response):Promise<void>{ 
          await pool.query('INSERT INTO puestotrabajador set ?',[req.body])
          console.log(req.body);
          res.json({message:'puestotrabajador saved'});
     }
     
     //metodo update -> update a puestotrabajador
     public async update(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE puestotrabajador set ? WHERE IdPuestoTrabajador=?',[req.body,req.params.id]); 
          res.json({message:'puestotrabajador updating'}); 
     }

} 

const puestoTrabajadorController=new PuestoTrabajadorController();
export default puestoTrabajadorController;