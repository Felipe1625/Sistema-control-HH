import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../../models/Administrador';
import { AdministradorService } from '../../../services/administrador/administrador.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.css']
})
export class AdministradorFormComponent implements OnInit {

  administrador: Administrador = {
    IdAdmin: 0,  //estos datos estan enlazados al form usando 2 way binding , asi que su valor es el mismo, por eso se inician vacios, para que no muestre un dato en el formulario al crear un juego
    Rut: '',
    Nombre: '',
    Apellido: '',
    Password: '',
  };

  habilitado: boolean;
  update: boolean = false;

  rut: boolean;
  nombre: boolean;
  apellido: boolean;
  password: boolean;
  repetirpassword: boolean;
  button: boolean = false;
  error:boolean=false;

  campoObligatorio='Campo obligatorio!';
  mensajeNombre=this.campoObligatorio;
  mensajeApellido=this.campoObligatorio;
  mensajeRepetirerror:string=this.campoObligatorio;
  mensajePassword=this.campoObligatorio;
  mensajeRut=this.campoObligatorio;

  rutlargo: string;
  nombrelargo: string;
  apellidolargo: string;
  passwordlargo: string;
  repetirpasswordlargo: string;
  RepetirPassword:string;


  constructor(private administradorservices: AdministradorService, private router: Router, private activatedRouter: ActivatedRoute) { }//

  ngOnInit() {

    const params = this.activatedRouter.snapshot.params;
    console.log(params);//se guarda el id, o queda arreglo vacio en caso que no venga nada, que es cuando vamos a agregar un juego
    if (params.id) {
      this.administradorservices.getAdministrador(params.id).subscribe(
        res => {
          console.log(res)
          this.administrador = res
          this.update = true;
          this.rut = true;
          this.nombre = true;
          this.apellido = true;
          this.password = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewAdministrador() {

    delete this.administrador.IdAdmin
  if(this.administrador.Password==this.RepetirPassword){
    this.error=false;
    
    this.administradorservices.saveAdministrador(this.administrador).subscribe(
      res => {
        console.log(res)
        this.habilitado = true;
        this.router.navigate(['/administrador']);
      },
      err => console.error(err)
    );
    console.log(this.administrador);
  }else{
    
    this.error=true;
    this.RepetirPassword='';
    this.repetirpassword = false;
    this.mensajeRepetirerror='La contraseña de verificación no coincide';
    this.button=false;
  }
    
  }

  updateAdministrador() {
    console.log(this.administrador)
    if(this.administrador.Password==this.RepetirPassword){
      this.error=false;
      this.administradorservices.updateAdministrador(this.administrador.IdAdmin, this.administrador).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/administrador']);
          
        },
        err => console.error(err)
      )
    
    }else{
        this.error=true;
        this.RepetirPassword='';
        this.repetirpassword = false;
        this.mensajeRepetirerror='La contraseña de verificación no coincide';
        this.button=false;
      }
   
  }

  

  RutChange($event: Event) { 
    this.rutlargo = (<HTMLInputElement>event.target).value;
    if (this.rutlargo.length == 0) {
      this.rut = false;
      this.mensajeRut=this.campoObligatorio;
    } else  {if(this.rutlargo.includes('.',2)==false || this.rutlargo.includes('.',6)==false || this.rutlargo.includes('-',10)==false || this.rutlargo.length!=12){
      this.rut=false;
      console.log(this.rutlargo.length);
      this.mensajeRut='Estructura rut: XX.XXX.XXX-Y';
    }else{
      this.rut = true;
    }
    }
    console.log(this.rut);
    this.HabilitarButton();
    
  }

  NombreChange($event: Event) {
    this.nombrelargo = (<HTMLInputElement>event.target).value;
    if (this.nombrelargo.length == 0) {
      this.nombre = false;
      this.mensajeNombre=this.campoObligatorio;
    } else {if(this.nombrelargo.length<3){
      this.nombre = false;
      this.mensajeNombre='Minimo 3 caracteres';
    }else{this.nombre = true;}
      
    }
    this.HabilitarButton();
  }


  ApellidoChange($event: Event) {
    this.apellidolargo = (<HTMLInputElement>event.target).value;
    if (this.apellidolargo.length == 0) {
      this.apellido = false;
      this.mensajeApellido=this.campoObligatorio;
    } else {if(this.apellidolargo.length < 3){
      this.apellido = false;
      this.mensajeApellido='Minimo 3 caracteres';
    }else{
      this.apellido = true;
    } 
    }
    this.HabilitarButton();
  }

  PasswordChange($event: Event) {
    this.passwordlargo = (<HTMLInputElement>event.target).value;
    if (this.passwordlargo.length == 0) {
      this.password=false;
      this.mensajePassword=this.campoObligatorio;
    } else {if(this.passwordlargo.length<5){
      this.password=false;
      this.mensajePassword='Minimo 5 caracteres';
    }else{
      this.password = true;
    }
    }
    this.HabilitarButton();
  }

  RepetirPasswordChange($event: Event) {
    this.repetirpasswordlargo = (<HTMLInputElement>event.target).value;
    if (this.repetirpasswordlargo.length == 0) {
      this.repetirpassword = false;
      this.mensajeRepetirerror=this.campoObligatorio;
    } else {
      this.repetirpassword = true;
    }
    this.HabilitarButton();
  }

  HabilitarButton() { 

    if (this.nombre == true && this.apellido == true && this.rut == true && this.password == true && this.repetirpassword == true) {
      this.button = true;
    } else {
      this.button = false;
    }
  }
}
