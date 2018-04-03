import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { RepVenta } from '../rep-ventas/rep-venta';
import { ConexionOracleService } from '../service/conexion-oracle.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss']
})
export class RegistroClienteComponent implements OnInit {

  constructor(private backEnd: ConexionOracleService,
              private router: Router) { }

  public log ;
  public cliente :Cliente = new Cliente();
  public repVentas: RepVenta = new RepVenta();
   
 

  ngOnInit() {
    if (localStorage.getItem('user') != ""){
      this.log=true;
      this.traerDatosRepresentante();
    }  
  }
  
  traerDatosRepresentante(){
    this.backEnd.getRepVentas(localStorage.getItem("user"), null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.representante) { 
          this.repVentas = jsonRespuesta.representante;
        } else {
          alert("No se encontro Representante \n" + jsonRespuesta.error);
          this.irAtras();
          
        }
      });
  }

  enviarDatosCliente(){
    if(this.validarCampos()){
    this.backEnd.postCliente(null,this.cliente, this.repVentas.codigo).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.estado) {
          alert ("Cliente creado exitosamente");
          this.limpiar();
        } else {
          alert("Error \n" + jsonRespuesta.error);
        }
      });
    }
  }
  irAtras() {
    this.router.navigate(['home']);
  }
  validarCampos() {
    if (!this.cliente.codigo || !this.cliente.nombre || !this.cliente.apellido ||
      !this.cliente.correo || !this.cliente.direccion || !this.cliente.telefono || !this.cliente.ciudad) {
      alert("Seleccione los campos necesarios");
      return false;
    }
    return true;
  }
  limpiar() {
    this.cliente= new Cliente;
  }

}
