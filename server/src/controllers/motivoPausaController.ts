import {Request,Response} from 'express';

import pool from '../database';

class MotivoPausaController{ 

     //list -> list all motivopausa

     public async list(req:Request,res:Response){
          const motivopausas=await pool.query('SELECT * FROM motivopausa');
          res.json(motivopausas);
     }

     //getOne -> list one motivopausa
     public async getOne(req:Request,res:Response):Promise<any>{
          const motivopausa=await pool.query('SELECT * FROM motivopausa WHERE IdMotivoPausa=?',[req.params.id]);
          if(motivopausa.length > 0){
               return res.json(motivopausa[0]);
          }
          res.status(404).json({text:'motivopausa not founding'});
     }

     //metodo create -> insert motivopausa
     public async create(req:Request,res:Response):Promise<void>{ 
          await pool.query('INSERT INTO motivopausa set ?',[req.body])
          console.log(req.body); 
          res.json({message:'motivopausa saved'});
     }
     
     //metodo update -> update a motivopausa
     public async update(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE motivopausa set ? WHERE IdMotivoPausa=?',[req.body,req.params.id]);
          res.json({message:'motivopausa updating'});
     }

} 

const motivoPausaController=new MotivoPausaController();
export default motivoPausaController;