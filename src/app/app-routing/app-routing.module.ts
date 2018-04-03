import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistroClienteComponent } from '../registro-cliente/registro-cliente.component';
import { RegistroVentaComponent } from '../registro-venta/registro-venta.component';
import { AdministraPrivComponent } from '../administra-priv/administra-priv.component'
import { HomeComponent } from '../home/home.component';
const routes: Routes = [
  {
    path: 'registroCliente',  //parent path, define the component that you imported earlier..
    component: RegistroClienteComponent,
  },
  {
    path: 'registroVenta',  //parent path, define the component that you imported earlier..
    component: RegistroVentaComponent,
  },
  {
    path: 'administraPriv',  //parent path, define the component that you imported earlier..
    component: AdministraPrivComponent,
  },
  {
    path: 'home',  //parent path, define the component that you imported earlier..
    component: HomeComponent,
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
