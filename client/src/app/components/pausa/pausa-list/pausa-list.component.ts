import { Component, OnInit,ViewChild } from '@angular/core';
import { PausaService } from '../../../services/pausa/pausa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';//


@Component({
  selector: 'app-pausa-list',
  templateUrl: './pausa-list.component.html',
  styleUrls: ['./pausa-list.component.css']
})
export class PausaListComponent implements OnInit {
  Columnas: string[] = ['CodigoOt', 'Operador','Motivo', 'Fecha', 'HoraInicio', 'HoraFin', 'Tiempo'];
  pausas: any;
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

  constructor(private pausaService: PausaService) { }

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
    this.getPausas();

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
        
        return data.Codigo.toString().trim().indexOf(searchString.Codigo) !== -1 &&
          data.Nombre.toString().trim().toLowerCase().indexOf(searchString.Nombre.toLowerCase()) !== -1
      } else {
        
        return data.Codigo.toString().trim().indexOf(searchString.Codigo) !== -1 &&
          data.Nombre.toString().trim().toLowerCase().indexOf(searchString.Nombre.toLowerCase()) !== -1 && data.Fecha.toString().trim().toLowerCase().indexOf(fecha) !== -1;
      }
    }
    return myFilterPredicate;
  }


  getPausas() {
    this.pausaService.getPausas().subscribe(
      res => {
        this.pausas = res;
        console.log('getPausas');
        console.log(res)
        this.dataSource = new MatTableDataSource(this.pausas);
        this.dataSource.paginator = this.paginator;
      },
      err => { console.error(err) }, () => {//
        this.dataSource.filterPredicate = this.customFilterPredicate();
      }
    )
  }


 LimpiarFiltros() {
 
  this.filtroCodigo.setValue('');
  this.filtroFecha.setValue('');
  this.filtroOperador.setValue('')
}

}
