import{Router} from 'express';
import tiempoController from '../controllers/tiempoController';

class TiempoRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',tiempoController.list); //http://localhost:3000/api/tiempo/     
          this.router.post('/',tiempoController.create);//http://localhost:3000/api/trabajo/
     }

}

const tiempoRoutes=new TiempoRoutes();
export default tiempoRoutes.router;