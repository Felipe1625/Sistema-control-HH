import { Component, OnInit,ViewChild } from '@angular/core';
import {AdministradorService} from '../../../services/administrador/administrador.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';//
import {Administrador} from '../../../models/Administrador'

@Component({  
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: ['./administrador-list.component.css']
})

export class AdministradorListComponent implements OnInit {
  Columnas: string[] = ['Rut','Nombre','Acciones'];
  administradores:any;
  dataSource:any;
  filtroRut=new FormControl();
  filtroNombre=new FormControl();
  globalFilter = '';

  filteredValues = {
    Rut: '', Nombre: ''
  };
  constructor(private administradorService:AdministradorService) { }
  administrador_modal:Administrador={
    Nombre:""
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

    this.getAdministradores();
    
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

  getAdministradores(){
    this.administradorService.getAdministradores().subscribe(
      res=>{
        this.administradores=res;//le asignamos el valor de res(con los administradores), a nuestro array administradores
        console.log('getAdministradores');
        console.log(res)
        this.dataSource = new MatTableDataSource(this.administradores);
        console.log('data source con admins')
        console.log(this.dataSource)
        console.log('y su data')
        console.log(this.dataSource.data.length)
        this.dataSource.paginator = this.paginator;
      },
      err=>{console.error(err)},()=>{//
        this.dataSource.filterPredicate = this.customFilterPredicate();
      console.log(this.customFilterPredicate());
      } //en caso de no traer los administradores y traer un error, solo se mostrara en consola.
      
    )//al crear el componente trae los administradores, y los guarda en un array para mostrarlos despues
  //usamos res y err en caso de haber un error(err) en caso de devolver un dato del servidor(res), por eso esta en el constructor y en oninit
  
  }

  deleteAdministrador(){
    this.administradorService.deleteAdministrador(this.administrador_modal.IdAdmin).subscribe(
      res=>{
        console.log(res)
        this.getAdministradores()
      },
      err=>console.error('el error es: '+err)
    ) 
  }
  //para obtener el id y usarlo en el modal de eliminar
 getAdministrador(administrador){
   this.administrador_modal=administrador
   console.log(this.administrador_modal);
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


