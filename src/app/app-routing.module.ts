import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { PreciosComponent } from './precios/precios.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListarInscripcionesComponent } from './listar-inscripciones/listar-inscripciones.component';


const routes: Routes = [
  {
    path: '' , redirectTo: 'inscripcion' , pathMatch: 'full'
  },
  {
    path: 'inscripcion' , component: InscripcionComponent
  },
  {
    path: 'listado-clientes' , component: ListadoClientesComponent
  },
  {
    path: 'agregar-cliente/:clienteId' , component: AgregarClientesComponent
  },
  {
    path: 'agregar-cliente' , component: AgregarClientesComponent
  },
  {
    path: 'precios' , component: PreciosComponent
  },
  {
    path: 'listado-inscripciones' , component: ListarInscripcionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
