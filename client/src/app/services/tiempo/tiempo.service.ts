import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Tiempo} from '../../models/Tiempo'


@Injectable({
  providedIn: 'root'
})
export class TiempoService {
  API_URI = "http://localhost:3000/api" //ruta api en server

  constructor(private http: HttpClient) { }


  getTiempos() { //listar tiempos
    return this.http.get(`${this.API_URI}/tiempo`);
  }


  saveTiempo(tiempo: Tiempo) { //guardar tiempo, asi que le pasamos el tiempo, el cual esta estructurado en una class en models/Tiempo.ts
    console.log('en trabajo service el objeto tiempo: ' + tiempo);
    return this.http.post(`${this.API_URI}/tiempo`, tiempo)
  }



}
