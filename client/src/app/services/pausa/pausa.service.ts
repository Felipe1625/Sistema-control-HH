import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pausa} from '../../models/Pausa'; 
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PausaService {
  API_URI="http://localhost:3000/api" //ruta api en server
  constructor(private http:HttpClient) { }

  savePausa(pausa:Pausa){ //guardar pausa, asi que le pasamos la pausa, el cual esta estructurado en una class en models/Pausa.ts
    return this.http.post(`${this.API_URI}/pausa`,pausa)
    }

    getPausas(){//listar pausas
      return this.http.get(`${this.API_URI}/pausa`);
    }


}
