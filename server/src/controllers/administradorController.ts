import {Request,Response} from 'express';

import pool from '../database';
import jwt from 'jsonwebtoken'
//npm install --save @types/jsonwebtoken para usar jsonwebtoken

class AdministradorController{ 
      
     //list -> list all administradores

     public async list(req:Request,res:Response){
          const administradores=await pool.query('SELECT IdAdmin,Rut, CONCAT(Nombre,\' \',Apellido) as Nombre from administrador where Habilitado=1'); //consulta async
          res.json(administradores); //la lista queda guardada en administradores, asi que lo mostramos 
     }

     //getOne -> list one administrador
     public async getOne(req:Request,res:Response):Promise<any>{
          const administrador=await pool.query('SELECT * FROM administrador WHERE IdAdmin=?',[req.params.id]); //el id a buscar esta almacenado en req.params.id
          if(administrador.length > 0){
               return res.json(administrador[0]); //retorna el administrador si lo encuentra por id
          }
          res.status(404).json({text:'administrador not founding'}); //mensaje de administrador no encontrado     
     }

     //metodo create -> insert administrador
     public async create(req:Request,res:Response):Promise<void>{ 
          await pool.query('INSERT INTO administrador set ?',[req.body]) //para insert, await es espera hasta que termine, ya que el metodo es asincrono
          console.log(req.body); // req.body contiene los datos del cliente, los datos que angular enviara al servidor
          res.json({message:'administrador saved'}); //una vez completada la linea anterior, devolvemos un json con mensaje de administrador guardado
     }
     
     //metodo update -> update a administrador
     public async update(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE administrador set ? WHERE IdAdmin=?',[req.body,req.params.id]);
          res.json({message:'updated administrador'}); //req.body tiene los datos a actualizar y req.params.id tiene el id del objeto a actualizar
     }
     

     //metodo delete -> delete a administrador by logic
     public async delete(req:Request,res:Response):Promise<void>{
          await pool.query('UPDATE administrador set Habilitado=0 WHERE IdAdmin=?',[req.params.id]);
          res.json({message:'administrador removed'});
     }

     public async signup(req:Request,res:Response):Promise<void>{ 
          const {rut,password,nombre,apellido}=req.body;
          console.log(rut)
          console.log(password)
         
          var newUser={
               rut:rut,
               nombre:nombre,
               apellido:apellido,
               password:password
          }
          const sql=await pool.query('INSERT INTO administrador set ?',[newUser]) 
          let idAdminInsertado=sql.insertId;
          console.log('id: '+idAdminInsertado)
          const token=jwt.sign({_id: idAdminInsertado},'secretkey')
          console.log('token='+token)
          res.status(200).json({token})
          //res.json({message:'adminisatrdor insertado correctamente!'});
     }

     public async signin(req:any,res:any):Promise<void>{ 
          const {rut,password}=req.body;
          console.log(rut)
          console.log(password)
          var User={
               IdAdmin:0,
               Rut:'',
               Nombre:'',
               Apellido:'',
               Password:password,
               Habilitado:0
          }
          const existe=await pool.query('SELECT * FROM administrador WHERE Rut=\''+rut+'\'')
          if(existe.length==0){
               //res.json({message:'administrador no esta en la db'})
               return res.status(401).send("El rut no existe")
          }else{
               const admin=await pool.query('SELECT * FROM administrador WHERE Rut=\''+rut+'\' AND Password=\''+password+'\'')
               if(admin.length > 0){ 
                    User=admin[0]
                    console.log('usuario User= '+User)
                    console.log('idadmin User= '+User.IdAdmin)
                    const token=jwt.sign({_id: User.IdAdmin},'secretkey')
                    res.status(200).json({token})
                    console.log('token= '+token)
               }else{
                    //res.json({message:'password incorrecta'});
                    return res.status(401).send("Contraseña incorrecta") 
               }
          }
          

     }


} 

const administradorController=new AdministradorController();
export default administradorController;