import {Request,Response} from 'express';

import pool from '../database';

class OtController{ 

     //list -> list all ot

     public async list(req:Request,res:Response){
          const ots=await pool.query('SELECT IdOt,Codigo,HorasPresupuestadas,HorasTrabajadas,SUBSTRING_INDEX(timediff(HorasPresupuestadas,HorasTrabajadas),\'\.\',1) as Balance FROM ot WHERE Activa=1'); 
          res.json(ots);
     }

     //getOne -> list one ot
     public async getOne(req:Request,res:Response):Promise<any>{
          const ot=await pool.query('SELECT * FROM ot WHERE IdOt=?',[req.params.id]); 
          if(ot.length > 0){
               return res.json(ot[0]);  
          }
          res.status(404).json({text:'ot not founding'}); 
     }

     //metodo create -> insert ot
     public async create(req:Request,res:Response):Promise<void>{ 
          await pool.query('INSERT INTO ot set ?',[req.body])
          res.json({message:'ot saved'});
          
     }
     
     //metodo update -> update a ot
     public async update(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE ot set ? WHERE IdOt=?',[req.body,req.params.id]);
          await res.json({message:'ot updating'});
          
     }
 

      //metodo close -> close ot
      public async close(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE ot set Activa=0 WHERE IdOt=?',[req.params.id]);
          res.json({message:'ot close'});
     }

      //metodo delete -> delete ot by logic
      public async delete(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE ot set Habilitado=0 WHERE IdOt=?',[req.params.id]);
          res.json({message:'ot removed'});
     }

     public async searchcode(req:Request,res:Response):Promise<any>{
          console.log('metodo searchcode de ot controller, codigo: '+[req.params.id])
          const ot=await pool.query('SELECT * FROM ot WHERE codigo=?',[req.params.id]); 
          if(ot.length > 0){
               console.log('la ot existe: ')
               console.log(ot.IdOt)
               return res.json('existe'); 
          }else{
               console.log('la ot no existe: ')
               console.log(ot)
               return res.json('no existe');
          }
          
     }

     public async getOtByCodigo(req:Request,res:Response):Promise<any>{
          const ot=await pool.query('SELECT * FROM ot WHERE Codigo=?',[req.params.id]); 
          if(ot.length > 0){
               return res.json(ot[0]); 
          }
          res.status(404).json({text:'ot not founding'});
     }


} 

const otController=new OtController();
export default otController;