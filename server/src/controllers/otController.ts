import {Request,Response} from 'express';

import pool from '../database';

class OtController{ 

     //list -> list all ot

     public async list(req:Request,res:Response){
          // const ots=await pool.query('SELECT IdOt,Codigo,HorasPresupuestadas,HorasTrabajadas,SUBSTRING_INDEX(timediff(HorasPresupuestadas,HorasTrabajadas),\'\.\',1) as Balance FROM ot WHERE Activa=1'); 
          const ots=await pool.query('SELECT o.IdOt as IdOt,o.Codigo as Codigo,o.HorasPresupuestadas as HorasPresupuestadas,SUBSTRING_INDEX(SEC_TO_TIME(SUM(TIME_TO_SEC(t.TotalTiempo))),\'\.\', 1) AS HorasTrabajadas,SUBSTRING_INDEX(timediff(HorasPresupuestadas,SUBSTRING_INDEX(SEC_TO_TIME(SUM(TIME_TO_SEC(t.TotalTiempo))), \'\.\', 1)),\'\.\',1) as Balance from ot o INNER join trabajo t on o.IdOt=t.IdOt GROUP by t.IdOt'); 
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

     //metodo create -> insert ot
     public async creatAndReturnId(req:Request,res:Response):Promise<void>{ 
          console.log('-------')
          console.log('-------')
          console.log('-------')
          console.log('-------')
          console.log(req.body)
          console.log('-------')
          console.log('-------')
          console.log('-------')
          console.log('-------')
          const sql=await pool.query('INSERT INTO ot set ?',[req.body])
          res.json(sql.insertId);
          
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


     public async verificarExisteOt(req:Request,res:Response):Promise<any>{
          console.log('metodo verificarExisteOt de ot controller, codigo: '+[req.params.id])
          const ot=await pool.query('SELECT * FROM ot WHERE codigo=?',[req.params.id]); 
          if(ot.length > 0){
               console.log('la ot existe: ')
               console.log(ot[0].IdOt)
               return res.json(ot[0].IdOt);

          }else{
               console.log('la ot no existe: ')
               console.log(ot)
               return res.json('no existe');
          }
          
     }

} 

const otController=new OtController();
export default otController;