import { Component, OnInit } from '@angular/core';
import { ConexionOracleService } from '../service/conexion-oracle.service';
import { Router } from '@angular/router';
import { Producto } from '../productos/producto'
import { Cliente } from '../clientes/cliente';
import { Venta } from '../ventas/venta';
import { VentasProd} from '../ventasProds/ventasProd'
import { Region } from '../regiones/region'

@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.component.html',
  styleUrls: ['./registro-venta.component.scss']
})
export class RegistroVentaComponent implements OnInit {

  constructor(private backEnd: ConexionOracleService,
              private router: Router) { }
  ngOnInit() {
    this.traerRegiones();
    this.traerCategorias();
    this.traerDatosCliente();
  }

  public regiones : Region;
  public region;
  public categorias;
  public categoria;
  public productos : Producto;
  public carrito : Array<Producto> = new Array<Producto>();
  public vendido: Array<Producto> = new Array<Producto>();
  public cantidad =0;
  public encarrito = false;
  public pagar = false;
  public pagoTarjeta=true;
  public pagoPSE;
  public cliente :Cliente;
  public venta : Venta = new Venta();
  public valorTotal :number=0;
  public items: number =0;
  public ventasProd : Array<VentasProd>


  traerRegiones(){
    this.backEnd.getRegiones(null,null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.regiones) {
          this.regiones = jsonRespuesta.regiones;
        } else {
          alert("No se encontraron regiones \n" + jsonRespuesta.error);
          this.irAtras();
        }
      });
  }
  traerCategorias() {
    this.backEnd.getCategorias(null, null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.categorias) {
          this.categorias = jsonRespuesta.categorias;
        } else {
          alert("No se encontraron categorias \n" + jsonRespuesta.error);
          this.irAtras();
        }
      });
  }
  traerDatosCliente() {
    this.backEnd.getCliente(localStorage.getItem("user"), null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.cliente) {
          this.cliente = jsonRespuesta.cliente;
        } else {
          alert("No se encontraron datos del cliente \n" + jsonRespuesta.error);
          this.irAtras();

        }
      });
  }
  verProductos(){
    this.encarrito=false;
    this.backEnd.getProductos(this.region.nombre, this.categoria.nombre, null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.productos) {
          this.productos = jsonRespuesta.productos;
        } else {
          alert("No se encontraron productos \n" + jsonRespuesta.error);
        }
      });
  }
  anadirAlCarrito(producto){
    if(producto.cantidad>0 && producto.cantidad<producto.stock){
      producto.stock= producto.stock - producto.cantidad;
      alert("Se añadieron " + producto.cantidad +" de " + producto.nombre +" al carrito.")
      var ingresar = producto;
          ingresar.cantidad= producto.cantidad;
      this.carrito.push(ingresar)
      producto.bloqueo=true;
    }else{
      alert("La cantidad ingresada no pudo ser procesada")
    }
  }
  sacarDelCarrito(producto) {
      this.carrito.slice(this.carrito.indexOf(producto),1);
      producto.stock = producto.stock + producto.cantidad;
      producto.cantidad = 0;
      producto.bloqueo=false;
  }

  realizarVenta(){
    
    this.venta.precioFinal= this.valorTotal;
    this.venta.estado= "TERMINADO"
    this.venta.fecha = new Date().toISOString().substring(0,10);
    
    this.backEnd.postVenta(null, this.cliente, this.venta).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.estado) {
          alert("Venta realizada")
        } else {
          alert("No se realizo la venta \n" + jsonRespuesta.error);
        }
        this.traerIdVenta()
        this.irAtras();
      }
    );
    
  }
  traerIdVenta(){
    this.backEnd.getVenta(this.cliente.codigo,this.venta, null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.codigo) {
          this.venta.codigo = jsonRespuesta.codigo;
        } else {
          alert("No se pudo traer la venta \n" + jsonRespuesta.error);
        }
        this.actualizarInventario();
      });
      
  }
  verCarrito(){
    if(this.encarrito==false){
      this.encarrito=true;
    }else{
      this.encarrito=false;
    } 
  }
  evaluaMedio(){
    if(this.pagoPSE==true||this.pagoTarjeta==false){
      this.pagoTarjeta= true;
      this.pagoPSE=false;
    }else{
      this.pagoTarjeta=false;
      this.pagoPSE=true;
    }
  }

  irAPagar(){
    this.pagar=true; 
    this.encarrito=false;
    for(var i=0; i<this.carrito.length; i++ ){
      let actual= this.carrito.pop()
      var precio:number = actual.cantidad*actual.precio; 
      this.valorTotal = this.valorTotal + precio;
      this.items=this.items + actual.cantidad;
      this.vendido.push(actual);
    } 
    }
  actualizarInventario(){
    for (var i = 0; i < this.vendido.length; i++) {
      let actual = this.vendido.pop()
      this.backEnd.postVentaProd(null, actual, this.venta).subscribe(
          respuesta => {
          let jsonRespuesta = respuesta.json();
          if (jsonRespuesta.estado) {
          } else {
            alert("Error \n" + jsonRespuesta.error);
          }
            this.backEnd.postProductoRegion(null, actual, this.region).subscribe(
              respuesta => {
                let jsonRespuesta = respuesta.json();
                if (jsonRespuesta.estado) {
                } else {
                  alert("Error \n" + jsonRespuesta.error);
                }
              });
        });
      
    } 
  }  
  irAtras() {
    this.router.navigate(['home']);
  }

}
