import {Request,Response} from 'express';

import pool from '../database';

class OperadorController{ 

     //list -> list all Operador

     public async list(req:Request,res:Response){
          const operadores=await pool.query('SELECT IdOperador,o.IdPuestoTrabajador, Descripcion, Rut,CONCAT(Nombre,\' \',Apellido) as Nombre,o.Password FROM operador o INNER JOIN puestotrabajador p ON o.IdPuestoTrabajador = p.IdPuestoTrabajador WHERE Habilitado=1 ORDER BY Apellido');
          res.json(operadores);
     }

     //getOne -> list one Operador
     public async getOne(req:Request,res:Response):Promise<any>{
          const operador=await pool.query('SELECT IdOperador,o.IdPuestoTrabajador, Descripcion, Rut, Nombre, Apellido,Password FROM operador o INNER JOIN puestotrabajador p ON o.IdPuestoTrabajador = p.IdPuestoTrabajador WHERE IdOperador=?',[req.params.id]);
          if(operador.length > 0){
               return res.json(operador[0]);
          }
          
     }

     //metodo create -> insert Operador
     public async create(req:Request,res:Response):Promise<void>{ 
          await pool.query('INSERT INTO operador set ?',[req.body])
          console.log(req.body);
          res.json({message:'Operador saved'});
     }
     
     //metodo update -> update a Operador
     public async update(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE operador set ? WHERE IdOperador=?',[req.body,req.params.id]);
          res.json({message:'Operador updating'}); 
     }

      //metodo delete -> delete a operador by logic
      public async delete(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE operador set Habilitado=0 WHERE IdOperador=?',[req.params.id]);
          res.json({message:'operador removed'});
     }



     //metodo listPuestosTrabajador -> list puestotrabajador
     public async listPuestosTrabajador(req:Request,res:Response){
          const puestotrabajadores=await pool.query('SELECT * FROM puestotrabajador');
          res.json(puestotrabajadores);        
     }
} 

const operadorController=new OperadorController();
export default operadorController;