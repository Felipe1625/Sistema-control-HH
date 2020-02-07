import { Component, OnInit, ViewChild } from '@angular/core';
import { OtService } from '../../../services/ot/ot.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';//


@Component({
  selector: 'app-ot-list',
  templateUrl: './ot-list.component.html',
  styleUrls: ['./ot-list.component.css']
})
export class OtListComponent implements OnInit {
  Columnas: string[] = ['Codigo', 'Acciones'];
  ots: any;
  dataSource: any;
  //
  filtroCodigo=new FormControl();
  //filtroDescripcion=new FormControl();
  globalFilter = '';

  filteredValues = {
    Codigo: ''
  };
//
  

  constructor(private otService: OtService) { }

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
      err => {console.error(err)},()=>{//
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
  }

  LimpiarFiltros(){
    
this.filtroCodigo.setValue('');

  }
}
