import { Component, OnInit } from '@angular/core';
import { Ot } from '../../../models/Ot';
import { OtService } from '../../../services/ot/ot.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-ot-form',
  templateUrl: './ot-form.component.html',
  styleUrls: ['./ot-form.component.css']
})
export class OtFormComponent implements OnInit {

  ot: Ot = {
    IdOt: 0,
    Codigo:'',
    Descripcion: '',
  }

  habilitado: boolean;
  update: boolean = false;
  codigo: boolean;
  descripcion: boolean;
  button: boolean = false;
  error: boolean = false;
  codigoLargo: string;
  descripcionLargo: string;
  mensajeError:string='Campo obligatorio!';
  mensajeCodigo: string=this.mensajeError;
  mensajeDescripcion:string=this.mensajeError;
  constructor(private otservices: OtService, private router: Router, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRouter.snapshot.params;
    console.log(params);
    if (params.id) {
      this.otservices.getOt(params.id).subscribe(
        res => {
          console.log(res)
          this.ot = res
          this.update = true;
          this.codigo = true;
          this.descripcion = true;
          this.button=true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewOt() {

    delete this.ot.IdOt
    this.error = false;
    this.otservices.saveOt(this.ot).subscribe(
      res => {
        console.log(res)
        this.habilitado = true;
        this.router.navigate(['/ot']);
      },
      err => console.error(err)
    );
    console.log(this.ot);
  }

  updateOt() {
    console.log(this.ot)

    this.error = false;
    this.otservices.updateOt(this.ot.IdOt, this.ot).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/ot']);

      },
      err => console.error(err)
    )
  }

  CodigoChange($event: Event) {
    this.codigoLargo = (<HTMLInputElement>event.target).value;
    if (this.codigoLargo.length == 0) {
      this.codigo = false;
      this.mensajeCodigo = this.mensajeError;
    } else {
      if (this.codigoLargo.length < 3) {
        this.codigo = false;
        this.mensajeCodigo = 'Minimo 3 digitos';
      } else { this.codigo = true; }

    }
    this.HabilitarButton();
  }

  DescripcionChange($event: Event) {
    this.descripcionLargo = (<HTMLInputElement>event.target).value;
    if (this.descripcionLargo.length == 0) {
      this.descripcion = false;
      this.mensajeDescripcion = this.mensajeError;
    } else {
      if (this.descripcionLargo.length < 3) {
        this.descripcion = false;
        this.mensajeDescripcion = 'Minimo 3 caracteres';
      } else { this.descripcion = true; }

    }
    this.HabilitarButton();
  }


  HabilitarButton() {

    if (this.codigo == true && this.descripcion==true) {
      this.button = true;
    } else {
      this.button = false;
    }
  }

}
