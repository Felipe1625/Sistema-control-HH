import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import AdministradorRoutes from './routes/administradorRoutes';
import MotivoPausaRoutes from './routes/MotivoPausaRoutes';
import OperadorRoutes from './routes/OperadorRoutes';
import OtRoutes from './routes/OtRoutes';
import PausaRoutes from './routes/PausaRoutes';
import PuestoTrabajadorRoutes from './routes/PuestoTrabajadorRoutes';
import TrabajoRoutes from './routes/TrabajoRoutes';
import { urlencoded } from 'body-parser';
import TiempoRoutes from './routes/TiempoRoutes';


class Server{

     public app:Application;
     constructor(){
          this.app=express();
          this.config();
          this.routes(); 
     }

     config():void{
          this.app.set('port',process.env.PORT || 3000);
          this.app.use(morgan('dev'));
          this.app.use(cors());
          this.app.use(express.json());
          this.app.use(urlencoded({extended: false}));
     }

     routes():void{
          this.app.use('/',indexRoutes);
          this.app.use('/api/administrador',AdministradorRoutes);
          this.app.use('/api/motivoPausa',MotivoPausaRoutes);
          this.app.use('/api/operador',OperadorRoutes);
          this.app.use('/api/ot',OtRoutes);
          this.app.use('/api/pausa',PausaRoutes);
          this.app.use('/api/puestoTrabajador',PuestoTrabajadorRoutes);
          this.app.use('/api/trabajo',TrabajoRoutes); 
          this.app.use('/api/tiempo',TiempoRoutes);
     } 
     
     start():void{
          this.app.listen(this.app.get('port'),()=>{
               console.log('Server on port ',this.app.get('port'));
          });
     }
}

const server=new Server();
server.start();