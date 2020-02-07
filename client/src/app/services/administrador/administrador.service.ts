import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Administrador} from '../../models/Administrador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  API_URI="http://localhost:3000/api" //ruta api en server

  constructor(private http:HttpClient) { }

  getAdministradores(){ //listar administradores
    return this.http.get(`${this.API_URI}/administrador`);
  }

  getAdministrador(IdAdmin:string){ //traer administrador segun id
    return this.http.get(`${this.API_URI}/administrador/${IdAdmin}`)
  }

  saveAdministrador(administrador:Administrador){ //guardar admin, asi que le pasamos el admin, el cual esta estructurado en una class en models/Administrador.ts
    return this.http.post(`${this.API_URI}/administrador`,administrador)
    }
  
  //indicamos que el id puede ser de tipo string o de tipo number
    updateAdministrador(IdAdmin:string|number,updatedAdministrador:Administrador): Observable<Administrador>{
      return this.http.put(`${this.API_URI}/administrador/${IdAdmin}`,updatedAdministrador)
    }

    deleteAdministrador(IdAdmin:string|number):Observable<Administrador>{
      return this.http.put(`${this.API_URI}/administrador/delete/${IdAdmin}`,'');
    }

 
}
