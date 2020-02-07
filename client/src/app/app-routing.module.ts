import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import {AdministradorListComponent} from './components/administrador/administrador-list/administrador-list.component';
import { AdministradorFormComponent } from './components/administrador/administrador-form/administrador-form.component';
import { OperadorListComponent } from './components/operador/operador-list/operador-list.component';
import { OperadorFormComponent } from './components/operador/operador-form/operador-form.component';
import { TrabajoListComponent } from './components/trabajo/trabajo-list/trabajo-list.component';
import { OtFormComponent } from './components/ot/ot-form/ot-form.component';
import { OtListComponent } from './components/ot/ot-list/ot-list.component';
import { OperadorPantallaComponent } from './components/operador/operador-pantalla/operador-pantalla.component';
import { PausaListComponent } from './components/pausa/pausa-list/pausa-list.component';
import {AuthGuard} from './auth.guard'

const routes: Routes = [ {
  path: '',
  redirectTo: '/index',
  pathMatch: 'full'
},
{
  path: 'index',
  component: IndexComponent
},

//rutas de administrador
{
  path: 'administrador',
  component: AdministradorListComponent,
  canActivate:[AuthGuard]
},
{
  path: 'administrador/add',
  component: AdministradorFormComponent,
  canActivate:[AuthGuard]
},
{
  path:'administrador/update/:id', 
  component:AdministradorFormComponent,
  canActivate:[AuthGuard]
},

//fin rutas de administrador

//rutas de operador
{
  path: 'operador',
  component: OperadorListComponent,
  canActivate:[AuthGuard]
},
{
  path: 'operador/add',
  component: OperadorFormComponent,
  canActivate:[AuthGuard]
},
{
  path:'operador/update/:id',
  component:OperadorFormComponent,
  canActivate:[AuthGuard]
},
{
  path:'operadores',
  component:OperadorPantallaComponent
},
//fin rutas de operador

//rutas de trabajo
{
  path: 'trabajo',
  component: TrabajoListComponent,
  canActivate:[AuthGuard] //para proteger la ruta, debe pasar por aqui , por esta class
},

//fin rutas de trabajo
//inicio rutas ot

{
  path: 'ot',
  component: OtListComponent,
  canActivate:[AuthGuard]
},
{
  path: 'ot/add',
  component: OtFormComponent,
  canActivate:[AuthGuard]
},
{
  path:'ot/update/:id',
  component:OtFormComponent,
  canActivate:[AuthGuard]
},

//fin rutas ot
//inicio rutas pausa
{
  path: 'pausa',
  component: PausaListComponent,
  canActivate:[AuthGuard]
}
//fin rutas pausas
,{path: '404', component: IndexComponent},
{path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
