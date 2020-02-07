import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import{FormsModule,ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { AdministradorListComponent } from './components/administrador/administrador-list/administrador-list.component';
import { OperadorListComponent } from './components/operador/operador-list/operador-list.component';
import { OperadorFormComponent } from './components/operador/operador-form/operador-form.component';
import { TrabajoListComponent } from './components/trabajo/trabajo-list/trabajo-list.component';
import { IndexComponent } from './components/index/index.component';

//servicios para traer datos de rest api
import {TrabajoService} from './services/trabajo/trabajo.service';
import {AdministradorService} from './services/administrador/administrador.service';
import {OperadorService} from './services/operador/operador.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import{MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material';
import {MatPaginatorIntl} from '@angular/material';
import {MatPaginatorIntlEsp} from '../app/idioma';
import { MatTableExporterModule } from 'mat-table-exporter';
import { OtListComponent } from './components/ot/ot-list/ot-list.component';
import { OtFormComponent } from './components/ot/ot-form/ot-form.component';

//estas 2 para datepicker
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
//para que cambie el idioma del datapicker y se formatee en dia/mes/año
import {MAT_DATE_LOCALE} from '@angular/material';
import { OperadorPantallaComponent } from './components/operador/operador-pantalla/operador-pantalla.component';
import { PausaListComponent } from './components/pausa/pausa-list/pausa-list.component';

//import {MatIconModule} from '@angular/material/icon';

import {AuthGuard} from './auth.guard';
import { FooterComponent } from './components/footer/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AdministradorFormComponent,
    AdministradorListComponent,
    OperadorListComponent,
    OperadorFormComponent,
    TrabajoListComponent,
    IndexComponent,
    OtListComponent,
    OtFormComponent,
    OperadorPantallaComponent,
    PausaListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule, 
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableExporterModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ 
    TrabajoService,
    AdministradorService,
    OperadorService,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlEsp},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    AuthGuard
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
