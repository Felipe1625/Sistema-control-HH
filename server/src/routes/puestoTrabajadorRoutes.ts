import{Router} from 'express';
import puestoTrabajadorController from '../controllers/puestoTrabajadorController';

class PuestoTrabajadorRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',puestoTrabajadorController.list); //http://localhost:3000/api/puestoTrabajador/
          this.router.get('/:id',puestoTrabajadorController.getOne); //http://localhost:3000/api/puestoTrabajador/10
          this.router.post('/',puestoTrabajadorController.create);//http://localhost:3000/api/puestoTrabajador/
          this.router.put('/:id',puestoTrabajadorController.update);//http://localhost:3000/api/puestoTrabajador/10
     }

}

const puestoTrabajadorRoutes=new PuestoTrabajadorRoutes();
export default puestoTrabajadorRoutes.router;
