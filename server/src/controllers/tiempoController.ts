import {Request,Response} from 'express';

import pool from '../database';

class TiempoController{ 

     //list -> list all tiempos

     public async list(req:Request,res:Response){
          const tiempos=await pool.query('SELECT * FROM tiempo');
          res.json(tiempos);
     }

 
     //metodo create -> insert tiempo
     public async create(req:Request,res:Response):Promise<void>{ 
          // const sql=await pool.query('INSERT INTO trabajo set IdOt='+req.body.IdOt+',IdOperador='+req.body.IdOperador+',Fecha=\''+req.body.Fecha+'\',HoraInicio=\''+req.body.HoraInicio+'\',HoraFin=\''+req.body.HoraFin+'\',TotalTiempo=TIMEDIFF(\''+req.body.HoraFin+'\',\''+req.body.HoraInicio+'\')')
          // // console.log(req.body); 
          // res.json(sql.insertId);
          await pool.query('INSERT INTO tiempo set ?',[req.body])
          console.log(req.body); 
          res.json({message:'tiempo saved'});         
     }
     
} 

const tiempoController=new TiempoController();
export default tiempoController;