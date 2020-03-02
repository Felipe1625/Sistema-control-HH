import { Component, OnInit, ViewChild } from '@angular/core';
import { TrabajoService } from '../../../services/trabajo/trabajo.service';
import { OtService } from '../../../services/ot/ot.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';//
import { Trabajo } from 'src/app/models/Trabajo';
import { Ot } from 'src/app/models/Ot';
import { TiempoService } from '../../../services/tiempo/tiempo.service'
import { Tiempo } from '../../../models/Tiempo'


@Component({
  selector: 'app-trabajo-list',
  templateUrl: './trabajo-list.component.html',
  styleUrls: ['./trabajo-list.component.css']
})

export class TrabajoListComponent implements OnInit {
  Columnas: string[] = ['CodigoOt', 'Operador', 'Fecha', 'HoraInicio', 'HoraFin', 'Tiempo', 'Accion'];
  // Columnas: string[] = ['Accion', 'CodigoOt', 'Operador', 'Fecha', 'FechaFin', 'HoraInicio', 'HoraFin', 'Jornadas', 'Tiempo'];
  trabajos: any;
  tiempos: any;
  listTiempo: Tiempo[] = []
  dataSource: any;
  filtroCodigo = new FormControl();
  filtroOperador = new FormControl();
  filtroFecha = new FormControl();
  globalFilter = '';
  codigo: any;
  mySubscription: any;//para recargar la pagina

  filteredValues = {
    Codigo: '', Nombre: '', Fecha: ''
  };
  ot: Ot = {
    IdOt: 0,
    Codigo: ''
  }

  otModificar: Ot = {

  }


  idTrabajoAmodificar: any;
  trabajoModificar: Trabajo = {
  }

  constructor(private trabajoService: TrabajoService, private tiempoService: TiempoService, private otService: OtService) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.filtroCodigo.valueChanges.subscribe((CodigoFilterValue) => {
      this.filteredValues['Codigo'] = CodigoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.filtroOperador.valueChanges.subscribe((OperadorFilterValue) => {
      this.filteredValues['Nombre'] = OperadorFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.filtroFecha.valueChanges.subscribe((FechaFilterValue) => {
      this.filteredValues['Fecha'] = FechaFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    console.log('buscar trabajos')
    this.getTrabajos();
    // this.getTiempo();
  }



  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.Nombre.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      var date = new Date(searchString.Fecha),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      var fecha = [day, mnth, date.getFullYear()].join("/");


      if (fecha == 'aN/aN/NaN') {
        // console.log('no tiene una fecha')
        return data.Codigo.toString().trim().indexOf(searchString.Codigo) !== -1 &&
          data.Nombre.toString().trim().toLowerCase().indexOf(searchString.Nombre.toLowerCase()) !== -1
      } else {
        // console.log('tiene una fecha')
        return data.Codigo.toString().trim().indexOf(searchString.Codigo) !== -1 &&
          data.Nombre.toString().trim().toLowerCase().indexOf(searchString.Nombre.toLowerCase()) !== -1 && data.Fecha.toString().trim().toLowerCase().indexOf(fecha) !== -1;
      }
    }
    return myFilterPredicate;
  }


  getTrabajos() {
    console.log('entro a buscar trabajos')
    this.trabajoService.getTrabajos().subscribe(
      res => {
        this.trabajos = res;
        console.log('getTrabajos');
        console.log(res)
        this.dataSource = new MatTableDataSource(this.trabajos);
        this.dataSource.paginator = this.paginator;
      },
      err => { console.error(err) }, () => {//

        this.dataSource.filterPredicate = this.customFilterPredicate();
      }
    )
  }

  // getTiempo() {
  //   this.tiempoService.getTiempos().subscribe(
  //     res => {
  //       this.tiempos = res;
  //       console.log('getTiempos');
  //       console.log(res)

  //     },
  //     err => { console.error(err) }, () => {//

  //     }
  //   )
  // }


  getData(trabajo: Trabajo) {
    this.codigo = trabajo.Codigo
    this.ot.IdOt = trabajo.IdOt;
    this.ot.Codigo = trabajo.Codigo;
    this.idTrabajoAmodificar = trabajo.IdTrabajo

  }

  //asigna en el array los datos del detalle del trabajo, si no encuentra tiempos, es porque se termino en el dia, asi que se tienen que mostrar los datos del mismo dia, si encuentra datos quiere decir que tiene tiempos, asi que se tiene que llenar el list de tiempos con los tiempos parac mostrar al adminisatrdor en una tabla en un modal


  //   detalleSegunTrabajo(trabajo: Trabajo) {
  // console.log('la lista tiene'+this.listTiempo)
  // this.listTiempo=[]
  // console.log('la lista despues de tiene= '+this.listTiempo)
  //     console.log(trabajo)
  //     console.log(trabajo.IdTrabajo)
  //   console.log(this.tiempos)
  //     for (let index = 0; index < this.tiempos.length; index++) {
  //       console.log(this.tiempos[index].IdTrabajo)
  //       if (this.tiempos[index].IdTrabajo == trabajo.IdTrabajo) {
  //         console.warn('este trabajo tiene un tiempo asociado!')
  //         this.listTiempo.push(this.tiempos[index])

  //         console.log(this.tiempos[index])
  //       }
  //     }
  //     // if(this.listTiempo.length==0){
  //     //   let objTiempo=new Tiempo()
  //     //   objTiempo.Fecha=trabajo.Fecha
  //     //   objTiempo.HoraInicio=trabajo.HoraInicio
  //     //   objTiempo.HoraFin=trabajo.HoraFin
  //     //   objTiempo.TotalTiempo=trabajo.TotalTiempo
  //     //   this.listTiempo.push(objTiempo)
  //     // }
  //   }


  updateTrabajo() {
    this.ot.Codigo = this.codigo;
    this.otModificar.Codigo = this.codigo;
    this.trabajoService.verificarExisteOt(this.ot.Codigo).subscribe(
      res => {
        console.log(res)
        if (res != "no existe") {
          this.trabajoModificar.IdOt = <number>res
          this.trabajoService.updateCodigoTrabajo(this.idTrabajoAmodificar, this.trabajoModificar).subscribe(
            res => {
              this.getTrabajos();
              console.log(res)
              
            },
            err => { console.log(err) })
        } else {
          console.log('la ot a modificar tiene= ' + this.otModificar)
          this.otService.saveOtandReturnId(this.otModificar).subscribe(
            res => {
              console.log('guardamos la nueva ot y su id es= ' + res)
              this.trabajoModificar.IdOt = <number>res
              this.trabajoService.updateCodigoTrabajo(this.idTrabajoAmodificar, this.trabajoModificar).subscribe(
                res => {
                  this.getTrabajos();
                  console.log(res)
                  
                },
                err => { console.log(err) })
            },
            err => { console.log(err) })
        }
      },
      err => console.error(err)
    )
  }

  LimpiarFiltros() {

    this.filtroCodigo.setValue('');
    this.filtroFecha.setValue('');
    this.filtroOperador.setValue('')
  }
}