import{Router} from 'express';
import pausaController from '../controllers/pausaController'

class PausaRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',pausaController.list); //http://localhost:3000/api/pausa/
          this.router.get('/:id',pausaController.getOne); //http://localhost:3000/api/pausa/10
          this.router.post('/',pausaController.create);//http://localhost:3000/api/pausa/
          this.router.put('/:id',pausaController.update);//http://localhost:3000/api/pausa/10
     }

}

const pausaRoutes=new PausaRoutes();
export default pausaRoutes.router;
