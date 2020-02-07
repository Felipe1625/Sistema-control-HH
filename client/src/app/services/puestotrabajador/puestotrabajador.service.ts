import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PuestoTrabajador} from '../../models/PuestoTrabajador'; 
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PuestotrabajadorService {
  API_URI="http://localhost:3000/api" //ruta api en server
  constructor(private http:HttpClient) { }

  getPuestosTrabajador(){ //listar puestos trabajadores
    return this.http.get(`${this.API_URI}/puestoTrabajador`);
  }

}
