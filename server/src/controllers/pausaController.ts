import {Request,Response} from 'express';

import pool from '../database';

class PausaController{ 

     //list -> list all pausa

     public async list(req:Request,res:Response){
          const pausas=await pool.query('SELECT o.Codigo as Codigo,CONCAT(op.Nombre,\' \',op.Apellido) as Nombre,m.Descripcion as Motivo,p.Fecha,p.HoraInicio,p.HoraFin,p.TotalTiempo FROM pausa p inner join trabajo t on t.IdTrabajo=p.IdTrabajo inner join operador op on op.IdOperador=t.IdOperador inner join ot o on o.IdOt=t.IdOt inner join motivopausa m on m.IdMotivoPausa=p.IdMotivoPausa WHERE o.ACTIVA=1'); 
          res.json(pausas); 
     }

     //getOne -> list one pausa
     public async getOne(req:Request,res:Response):Promise<any>{
          const pausa=await pool.query('SELECT * FROM pausa WHERE IdPausa=?',[req.params.id]);
          if(pausa.length > 0){
               return res.json(pausa[0]);
          }
          res.status(404).json({text:'pausa not founding'}); 
     }

     //metodo create -> insert pausa
     public async create(req:Request,res:Response):Promise<void>{ 
          await pool.query('INSERT INTO pausa set ?',[req.body])
          console.log(req.body);
          res.json({message:'pausa saved'});
     }
     
     //metodo update -> update a pausa
     public async update(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE pausa set ? WHERE IdPausa=?',[req.body,req.params.id]);
          res.json({message:'pausa updating'}); 
     }

} 

const pausaController=new PausaController();
export default pausaController;