import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
//import { Observable } from 'rxjs';
import {AuthService} from './services/auth/auth.service'
import {Router} from '@angular/router'

//este modulo sirve para verificar si el usuario esta loguado desde el frontend,usando la funcion de auth.service loggedIn, retornamos un true si el token existe , por lo que puede pasar a la siguiente pagina y hacer peticiones, sino, se redirecciona al login

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,private router:Router){
  }


  canActivate():boolean{
if(this.authService.loggedIn()){
  return true;
}
this.router.navigate(['/index'])
return false;
  }
  
  
}
