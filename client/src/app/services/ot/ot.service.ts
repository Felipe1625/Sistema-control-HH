import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ot} from '../../models/Ot';
import { Observable } from 'rxjs';


@Injectable({ 
  providedIn: 'root'
})
export class OtService { 
  API_URI="http://localhost:3000/api"
  constructor(private http:HttpClient) { }

  getOts(){ //listar ots
    return this.http.get(`${this.API_URI}/ot`);
  }

  getOt(IdOt:string|number){ //traer ot segun IdOt
    return this.http.get(`${this.API_URI}/ot/${IdOt}`)
  }

  saveOt(ot:Ot){ //guardar ot, asi que le pasamos el ot, el cual esta estructurado en una class en models/Ot.ts
    console.log('otservices')
    
    return this.http.post(`${this.API_URI}/ot`,ot)
    }


    saveOtandReturnId(ot:Ot){ //guardar ot, asi que le pasamos el ot, el cual esta estructurado en una class en models/Ot.ts
      console.log('saveOtandReturnId')
      
      return this.http.post(`${this.API_URI}/ot/createot`,ot)
      }

  
  //indicamos que el id puede ser de tipo string o de tipo number
    updateOt(IdOt:string|number,updatedOt:Ot): Observable<Ot>{
      return this.http.put(`${this.API_URI}/ot/${IdOt}`,updatedOt)
    }

    closeOt(IdOt:string|number):Observable<Ot>{
      return this.http.put(`${this.API_URI}/ot/close/${IdOt}`,'');
    }

    deleteOt(IdOt:string|number):Observable<Ot>{ 
      return this.http.put(`${this.API_URI}/ot/delete/${IdOt}`,'');
    }

    
    getOtByCodigo(Codigo:string){ //traer ot segun IdOt
      return this.http.get(`${this.API_URI}/ot/getOtByCodigo/${Codigo}`)
    }

    

}
