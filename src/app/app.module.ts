import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { RegistroVentaComponent } from './registro-venta/registro-venta.component';

import { ConexionOracleService } from './service/conexion-oracle.service';
import { AdministraPrivComponent } from './administra-priv/administra-priv.component';
import { HomeComponent } from './home/home.component';
import {CalificacionVentaComponent} from  './calificacion-venta/calificacion-venta.component'; 
import { BarRatingModule } from "ngx-bar-rating";



@NgModule({
  declarations: [
    AppComponent,
    RegistroClienteComponent,
    RegistroVentaComponent,
    AdministraPrivComponent,
    HomeComponent,
    CalificacionVentaComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    BarRatingModule,
  
  ],
  providers: [
    ConexionOracleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
