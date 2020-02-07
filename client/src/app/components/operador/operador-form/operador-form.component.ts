import { Component, OnInit } from '@angular/core';
import {Operador} from '../../../models/Operador';
import {OperadorService} from '../../../services/operador/operador.service';
import {ActivatedRoute,Router} from '@angular/router';
import {PuestoTrabajador} from '../../../models/PuestoTrabajador';
import {PuestotrabajadorService} from '../../../services/puestotrabajador/puestotrabajador.service';
import {FormControl,Validators} from '@angular/forms';
 
@Component({  
  selector: 'app-operador-form',
  templateUrl: './operador-form.component.html',
  styleUrls: ['./operador-form.component.css']
})
export class OperadorFormComponent implements OnInit {

  operador: Operador = {
    IdOperador: 0, 
    IdPuestoTrabajador:0,
    Rut: '',
    Nombre: '',
    Apellido: '',
    Password:''
  };

  puestos:any;

  habilitado:boolean;
  update:boolean=false;
  puestoSeleccionado:number;

  button: boolean = false;
  rut: boolean;
  nombre: boolean;
  apellido: boolean;
  cargo:boolean=false;
  error:boolean=false;
  password: boolean;
  passwordlargo: string;
  campoObligatorio='Campo obligatorio!';
  mensajeNombre=this.campoObligatorio;
  mensajeApellido=this.campoObligatorio;
  mensajeRut=this.campoObligatorio;
  mensajeCargo=this.campoObligatorio;
  mensajePassword=this.campoObligatorio;
  rutlargo: string;
  nombrelargo: string;
  apellidolargo: string;

  constructor(private operadorService:OperadorService,private router:Router,private activatedRouter:ActivatedRoute,private puestoTrabajadorService:PuestotrabajadorService) { } 

  ngOnInit() {
    this.puestos=this.getPuestos();

    console.log(this.puestos);
    const params=this.activatedRouter.snapshot.params;
    console.log(params);
    if(params.id){
      this.operadorService.getOperador(params.id).subscribe(
        res=>{
          console.log(res)
          this.operador=res
          this.update=true;
          this.puestoSeleccionado=this.operador.IdPuestoTrabajador;
          console.log(this.operador);
          console.log('puesto seleccionado: '+this.operador.IdPuestoTrabajador);
          this.rut = true;
          this.nombre = true;
          this.apellido = true;
          this.button=true;
          this.cargo=true;
          this.password=true;
        },
        err=>console.error(err)
      )
    }
  }

  
  saveNewOperador() {

    delete this.operador.IdOperador
  
    this.operadorService.saveOperador(this.operador).subscribe( 
      res => {
        console.log(res)
        this.habilitado=true;
        this.router.navigate(['/operador']);
      },
      err => console.error(err)
    );
      console.log(this.operador); 
  }

  updateOperador(){
    delete this.operador.Descripcion;
    
    console.log(this.operador)
    this.operadorService.updateOperador(this.operador.IdOperador,this.operador).subscribe(
    res=>{
    console.log(res)
    this.router.navigate(['/operador']);
    },
    err=>console.error(err)
    )
  }

  getPuestos(){ 
    console.log('entro');
    this.puestoTrabajadorService.getPuestosTrabajador().subscribe(
      res=>{
        this.puestos=res;
        console.log('getPuestosTrabajadores');
        console.log(res);
        
      },
      err=>console.error('el error es: '+err)
    )
  }

  operadorForm = new FormControl();

  //para obtener el id del select al cambiar
  selectChange(event){
    console.log(event);
    this.operador.IdPuestoTrabajador=event;
    this.cargo=true;
    this.HabilitarButton();
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

  HabilitarButton() { 

    if (this.nombre == true && this.apellido == true && this.rut == true && this.cargo==true && this.password==true) {
      this.button = true;
      console.log(this.button);
    } else {
      this.button = false;
      console.log(this.button);
    }
  }

  PasswordChange($event: Event) {
    this.passwordlargo = (<HTMLInputElement>event.target).value;
    if (this.passwordlargo.length == 0) {
      this.password=false;
      this.mensajePassword=this.campoObligatorio;
    } else {if(this.passwordlargo.length<3){
      this.password=false;
      this.mensajePassword='Minimo 3 caracteres';
    }else{
      this.password = true;
    }
    }
    this.HabilitarButton();
  }

}
