import {Request,Response} from 'express';

import pool from '../database';

class TrabajoController{ 

     //list -> list all trabajos 

     public async list(req:Request,res:Response){
          const trabajos=await pool.query('SELECT IdTrabajo,o.IdOt as IdOt,o.Codigo as Codigo,CONCAT(op.Nombre,\' \',op.Apellido) as Nombre,Fecha,HoraInicio,HoraFin,TotalTiempo FROM trabajo t inner join ot o on o.IdOt=t.IdOt inner join operador op on op.IdOperador=t.IdOperador WHERE o.ACTIVA=1');
          res.json(trabajos);
          console.log(trabajos);
     }

     //getOne -> list one trabajo
     public async getOne(req:Request,res:Response):Promise<any>{
          const trabajo=await pool.query('SELECT * FROM trabajo WHERE IdTrabajo=?',[req.params.id]); 
          if(trabajo.length > 0){
               return res.json(trabajo[0]);
          }
          res.status(404).json({text:'trabajo not founding'});
     }
 
     //metodo create -> insert trabajo
     public async create(req:Request,res:Response):Promise<void>{ 
          const sql=await pool.query('INSERT INTO trabajo set IdOt='+req.body.IdOt+',IdOperador='+req.body.IdOperador+',Fecha=\''+req.body.Fecha+'\',HoraInicio=\''+req.body.HoraInicio+'\',HoraFin=\''+req.body.HoraFin+'\',TotalTiempo=TIMEDIFF(\''+req.body.HoraFin+'\',\''+req.body.HoraInicio+'\')')
          // console.log(req.body); 
          console.log('sql data retornada: '+sql)
          res.json(sql.insertId);
          
          
     }
     
     //metodo update -> update a trabajo
     public async update(req:Request,res:Response):Promise<void>{
          console.log('req es: '+req.body);
          // await pool.query('UPDATE trabajo set ? WHERE IdTrabajo=?',[req.params,req.params.id]);
          // res.json({message:'trabajo updating'});
     }

     public async updateTotalTiempoTrabajo(req:Request,res:Response):Promise<void>{
          console.log('req body: '+req.body);
          console.log('req id: '+req.params.id);
         console.log('UPDATE trabajo set ? WHERE IdTrabajo=?',[req.body,req.params.id])
          await pool.query('UPDATE trabajo set ? WHERE IdTrabajo=?',[req.body,req.params.id]);
          //await pool.query('UPDATE ot set ? WHERE IdOt=?',[req.body,req.params.id]);
          res.json({message:'trabajo updating'});
     }

     
     public async updateCodigoTrabajo(req:Request,res:Response):Promise<void>{
          console.log('req body: '+req.body);
          console.log('req id: '+req.params.id);
         console.log('UPDATE trabajo set ? WHERE IdTrabajo=?',[req.body,req.params.id])
          await pool.query('UPDATE trabajo set ? WHERE IdTrabajo=?',[req.body,req.params.id]);
          //await pool.query('UPDATE ot set ? WHERE IdOt=?',[req.body,req.params.id]);
          res.json({message:'trabajo updating'});
     }

} 

const trabajoController=new TrabajoController();
export default trabajoController;