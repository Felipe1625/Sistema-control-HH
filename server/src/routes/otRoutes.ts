import{Router} from 'express';
import otController from '../controllers/otController';

class OtRoutes{
     public router:Router=Router();

     constructor(){
          this.config();
     }

     config():void{
          this.router.get('/',otController.list); //http://localhost:3000/api/ot/
          this.router.get('/:id',otController.getOne); //http://localhost:3000/api/ot/10
          this.router.post('/',otController.create);//http://localhost:3000/api/ot/
          this.router.put('/:id',otController.update);//http://localhost:3000/api/ot/10
          this.router.put('/close/:id',otController.close);//http://localhost:3000/api/administrador/close/10
          this.router.put('/delete/:id',otController.delete);//http://localhost:3000/api/administrador/delete/10 
          this.router.get('/searchcode/:id',otController.searchcode);//http://localhost:3000/api/ot/searchcode/10 
          this.router.get('/getOtByCodigo/:id',otController.getOtByCodigo); //http://localhost:3000/api/ot/getOtByCodigo/10
          this.router.get('/verificarOt/:id',otController.verificarExisteOt);//http://localhost:3000/api/ot/searchcode/10 
          
          this.router.post('/createot/',otController.creatAndReturnId);//http://localhost:3000/api/ot/
     }

}

const otRoutes=new OtRoutes();
export default otRoutes.router;
