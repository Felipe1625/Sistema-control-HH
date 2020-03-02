import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trabajo } from '../../models/Trabajo';
import { Observable } from 'rxjs';
import { Ot } from '../../models/Ot';
import { OtTrabajador } from '../../models/OtTrabajador'
 
@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  API_URI = "http://localhost:3000/api" //ruta api en server

  constructor(private http: HttpClient) { }

  getTrabajos() { //listar trabajos
    return this.http.get(`${this.API_URI}/trabajo`);
  }

  getTrabajo(IdTrabajo: string) { //traer trabajo segun id
    return this.http.get(`${this.API_URI}/trabajo/${IdTrabajo}`)
  }

  saveTrabajo(trabajo: OtTrabajador) { //guardar trabajo, asi que le pasamos el trabajo, el cual esta estructurado en una class en models/OtTrabajador.ts
    console.log('en trabajo service el objeto trabajao: ' + trabajo);
    return this.http.post(`${this.API_URI}/trabajo`, trabajo)
  }

  //indicamos que el id puede ser de tipo string o de tipo number
  // updateTrabajo(IdTrabajo:string|number,codigo:string|number): Observable<any>{
  //   return this.http.put(`${this.API_URI}/trabajo/${IdTrabajo}`,codigo)
  // }

  updateCodigoOt(IdOt: string | number, updatedOt: Ot): Observable<Ot> {
    console.log('id ot es: ' + IdOt);
    return this.http.put(`${this.API_URI}/ot/${IdOt}`, updatedOt)
  }



  verificarCodigoOt(Codigo: string|number) {
    console.log('metodo verificarCodigoOt de trabajoservice')
    console.log('codigo ot es: ' + Codigo);
    return this.http.get(`${this.API_URI}/ot/searchcode/${Codigo}`)

  }

  verificarExisteOt(Codigo: string|number) {
    console.log('metodo verificarCodigoOt de trabajoservice')
    console.log('codigo ot es: ' + Codigo);
    return this.http.get(`${this.API_URI}/ot/verificarOt/${Codigo}`)

  }


  updateTotalTiempo(IdTrabajo: string | number, TotalTiempo:OtTrabajador): Observable<OtTrabajador> {
    console.log('total de tiempo ot sin pausas= ' + TotalTiempo.TotalTiempo)
    console.log('idTrabajo en service= '+IdTrabajo)
    return this.http.put(`${this.API_URI}/trabajo/${IdTrabajo}`,TotalTiempo)
    
  }

  updateCodigoTrabajo(IdTrabajo: string | number, updatedTrabajo: Trabajo): Observable<Ot> {
    console.log('id trabajo es: ' + IdTrabajo);
    return this.http.put(`${this.API_URI}/trabajo/update/${IdTrabajo}`, updatedTrabajo)
  }

}
