import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  user={
    rut:'',
    password:'' 
  }
  mensajeErrorLogin:boolean=true;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.authService.logOut();
  }
 
  signin(){
    console.log(this.user)
    this.authService.signin(this.user).subscribe(res=>{
      console.log(res)
      // let token=res['token']
      localStorage.setItem('token',res['token'])
      this.router.navigate(['/trabajo'])
    },
    err=>{
      console.log(err)
      this.mensajeErrorLogin=false
      this.user.rut=""
      this.user.password=""
    }
    
    )

    
  }

  
  datosChange($event: Event){
    if((<HTMLInputElement>event.target).value.length!=0){
      this.mensajeErrorLogin=true;
    }

  }
}
