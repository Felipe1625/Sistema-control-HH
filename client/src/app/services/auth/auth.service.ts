import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URI="http://localhost:3000/api" //ruta api en server
  constructor(private http:HttpClient,private router:Router) { } 

  signin(user){
    return this.http.post(`${this.API_URI}/administrador/signin`,user)
  }
  //verificar si esta loguado o no
  loggedIn(){
  return !!localStorage.getItem('token') //esto verifica si tiene el token el localStorage, si lo tiene return true, else false
  }
  //para eliminar el token del localStorage
  logOut(){
localStorage.removeItem('token')
this.router.navigate(['/index'])
  }

}
