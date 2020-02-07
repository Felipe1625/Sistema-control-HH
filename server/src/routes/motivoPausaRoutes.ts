import{Router} from 'express';
import motivoPausaController from '../controllers/motivoPausaController';

class MotivoPausaRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',motivoPausaController.list); //http://localhost:3000/api/motivoPausa/
          this.router.get('/:id',motivoPausaController.getOne); //http://localhost:3000/api/motivoPausa/10
          this.router.post('/',motivoPausaController.create);//http://localhost:3000/api/motivoPausa/
          this.router.put('/:id',motivoPausaController.update);//http://localhost:3000/api/motivoPausa/10
     }

}

const motivoPausaRoutes=new MotivoPausaRoutes();
export default motivoPausaRoutes.router;
