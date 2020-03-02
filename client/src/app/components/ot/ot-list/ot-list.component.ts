import { Component, OnInit, ViewChild } from '@angular/core';
import { OtService } from '../../../services/ot/ot.service';
import { TrabajoService } from '../../../services/trabajo/trabajo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';//
import { Ot } from '../../../models/Ot'


@Component({
  selector: 'app-ot-list',
  templateUrl: './ot-list.component.html',
  styleUrls: ['./ot-list.component.css']
})
export class OtListComponent implements OnInit {
  Columnas: string[] = ['Codigo', 'HorasPresupuestadas', 'HorasTrabajadas', 'Balance', 'Acciones'];
  ots: any = [];
  trabajos: any = [];
  otTabla: any = [];
  dataSource: any;
  hPresupuestadas: number;
  btnHP: boolean = true;
  hPresupuestadas_: string = "0";
  //
  ot: Ot = {
    HorasPresupuestadas: ""
  }

  filtroCodigo = new FormControl();
  //filtroDescripcion=new FormControl();
  globalFilter = '';

  filteredValues = {
    Codigo: ''
  };
  //

  constructor(private otService: OtService, private trabajoService: TrabajoService) { }

  id: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    //
    this.filtroCodigo.valueChanges.subscribe((CodigoFilterValue) => {
      this.filteredValues['Codigo'] = CodigoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    //
    this.getOts()
    // this.getTrabajos();

  }


  //
  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      var globalMatch = !this.globalFilter;



      let searchString = JSON.parse(filter);
      return data.Codigo.toString().trim().indexOf(searchString.Codigo) !== -1
    }

    return myFilterPredicate;
  }
  //

  getOts() {
    this.otService.getOts().subscribe(
      res => {
        this.ots = res;
        console.log('getOts');
        console.log(res)
        this.dataSource = new MatTableDataSource(this.ots);
        this.dataSource.paginator = this.paginator;
      },
      err => { console.error(err) }, () => {//
        this.dataSource.filterPredicate = this.customFilterPredicate();
        console.log(this.customFilterPredicate());
      }
      //
    )
  }




  closeOt() {
    this.otService.closeOt(this.id).subscribe(
      res => {
        console.log('res');
        console.log(res)
        this.getOts()
      },
      err => console.error('el error es: ' + err)
    )
  }

  getid(idm) {
    this.id = idm
    console.log('el id es: ' + this.id);
    console.log(this.hPresupuestadas)
  }

  LimpiarFiltros() {

    this.filtroCodigo.setValue('');

  }

  verificarHP($event: Event) {
    this.btnHP = true
    if (parseInt((<HTMLInputElement>event.target).value) > 0) {
      console.log('valido')
      this.hPresupuestadas = parseInt((<HTMLInputElement>event.target).value)
      this.btnHP = false
      return
    } else {
      console.log('vacio,letras o numero menor a 1')
      return
    }
  }

  agregarHP() {
    console.log('hp= ' + this.hPresupuestadas)
    // if(this.hPresupuestadas.length==1){
    // console.log('hp= '+this.hPresupuestadas+ 'y su largo es 1')
    // }else{
    //   console.log('hp= '+this.hPresupuestadas+ 'y su largo es mayor de cero')
    // }
    if (this.hPresupuestadas < 10) {
      this.hPresupuestadas_ = '0' + this.hPresupuestadas + ':00:00';
      this.ot.HorasPresupuestadas = this.hPresupuestadas_
    } else {
      this.hPresupuestadas_ = this.hPresupuestadas + ':00:00'
      this.ot.HorasPresupuestadas = this.hPresupuestadas_
    }
    this.otService.updateOt(this.id,this.ot).subscribe(
      res => {
        console.log(res)
        this.getOts()
      },
      err => { console.error(err) }, () => {//
      }
    )
    this.hPresupuestadas_ = ""
  }

  limpiarModalHP() {
    console.log('limpiar input')
    this.hPresupuestadas_ = "0"
  }


}
