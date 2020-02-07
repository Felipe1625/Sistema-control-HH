import { Component, OnInit,ViewChild } from '@angular/core';
import {OperadorService} from '../../../services/operador/operador.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';//
import {Operador} from '../../../models/Operador'
 
@Component({ 
  selector: 'app-operador-list',
  templateUrl: './operador-list.component.html',
  styleUrls: ['./operador-list.component.css']
}) 
export class OperadorListComponent implements OnInit {
  Columnas: string[] = ['Rut','Nombre','Descripcion','Acciones'];
  operadores:any;
  dataSource:any;
  filtroRut=new FormControl();
  filtroNombre=new FormControl();
  globalFilter = '';

  filteredValues = {
    Rut: '', Nombre: ''
  };
  constructor(private operadorService:OperadorService) { }
  operador_modal:Operador={
    Nombre:"",
  };
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    //setTimeout(() => this.dataSource.paginator = this.paginator);
    this.filtroRut.valueChanges.subscribe((CodigoFilterValue) => {
      this.filteredValues['Rut'] = CodigoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.filtroNombre.valueChanges.subscribe((DescripcionFilterValue) => {
      this.filteredValues['Nombre'] = DescripcionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.getOperadores();
    
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.Nombre.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.Rut.toString().trim().toLowerCase().indexOf(searchString.Rut.toLowerCase()) !== -1 &&
        data.Nombre.toString().trim().toLowerCase().indexOf(searchString.Nombre.toLowerCase()) !== -1;
    }
    
    return myFilterPredicate;
  }

  getOperadores(){
    this.operadorService.getOperadores().subscribe(
      res=>{
        this.operadores=res;
        console.log('getOperadores');
        console.log(res);
        this.dataSource = new MatTableDataSource(this.operadores);
        this.dataSource.paginator = this.paginator;
      },
      err=>{console.error(err)},()=>{//
        this.dataSource.filterPredicate = this.customFilterPredicate();
      console.log(this.customFilterPredicate());
      }
    )
  }

  getOperador(operador){
    this.operador_modal=operador; 
    console.log(this.operador_modal)
  }

  deleteOperador(){
    this.operadorService.deleteOperador(this.operador_modal.IdOperador).subscribe(
      res=>{
        console.log(res)
        this.getOperadores()
      },
      err=>console.error('el error es: '+err)
    ) 
  } 

  applyFilter(filterValue: string) {
    console.log(filterValue)
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }

 LimpiarFiltros(){
  this.filtroNombre.setValue('');
  this.filtroRut.setValue('');
 }

}
