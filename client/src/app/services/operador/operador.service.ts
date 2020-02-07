import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Operador} from '../../models/Operador'; 
import { Observable} from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  API_URI="http://localhost:3000/api" //ruta api en server
  constructor(private http:HttpClient) { }

  getOperadores(){ //listar operadores
    return this.http.get(`${this.API_URI}/operador`);
  }

  getOperador(IdOperador:string){ //traer operador segun id
    return this.http.get(`${this.API_URI}/operador/${IdOperador}`)
  }

  saveOperador(operador:Operador){ //guardar operador, asi que le pasamos el operador, el cual esta estructurado en una class en models/Operador.ts
    return this.http.post(`${this.API_URI}/operador`,operador)
    }
  
  //indicamos que el id puede ser de tipo string o de tipo number
    updateOperador(IdOperador:string|number,updatedOperador:Operador): Observable<Operador>{
      return this.http.put(`${this.API_URI}/operador/${IdOperador}`,updatedOperador)
    }

    deleteOperador(IdOperador:string|number):Observable<Operador>{
      return this.http.put(`${this.API_URI}/operador/delete/${IdOperador}`,'');
    }


    getPuestosTrabajadores(){//listar puestos trabajos
      console.log('en services');
      return this.http.get(`${this.API_URI}/operador/puestos`);
    }


}
