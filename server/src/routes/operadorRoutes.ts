import{Router} from 'express';
import operadorController from '../controllers/operadorController';

class OperadorRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',operadorController.list); //http://localhost:3000/api/operador/
          this.router.get('/:id',operadorController.getOne); //http://localhost:3000/api/operador/10
          this.router.post('/',operadorController.create);//http://localhost:3000/api/operador/
          this.router.put('/:id',operadorController.update);//http://localhost:3000/api/operador/10
          this.router.put('/delete/:id',operadorController.delete);//http://localhost:3000/api/operador/delete/10
          this.router.get('/puestos',operadorController.listPuestosTrabajador); //http://localhost:3000/api/operador/puestos

     }

}

const operadorRoutes=new OperadorRoutes();
export default operadorRoutes.router;
