import{Router} from 'express';
import trabajoController from '../controllers/trabajoController';

class TrabajoRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',trabajoController.list); //http://localhost:3000/api/trabajo/
          this.router.get('/:id',trabajoController.getOne); //http://localhost:3000/api/trabajo/10
          this.router.post('/',trabajoController.create);//http://localhost:3000/api/trabajo/
          // this.router.put('/:id',trabajoController.update);//http://localhost:3000/api/trabajo/10
          
          this.router.put('/:id',trabajoController.updateTotalTiempoTrabajo);
          this.router.put('/update/:id',trabajoController.updateCodigoTrabajo);
     }

}

const trabajoRoutes=new TrabajoRoutes();
export default trabajoRoutes.router;
