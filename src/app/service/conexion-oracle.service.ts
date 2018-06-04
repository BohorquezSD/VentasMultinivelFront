import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { log } from 'util';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Cliente } from '../clientes/cliente';
import { Venta } from '../ventas/venta'
import { Producto } from '../productos/producto';
import { Region } from '../regiones/region';

@Injectable()
export class ConexionOracleService {  
  
  headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type' : 'application/json',
    'Accept': 'application/json',
    });

                 
  url: string = "http://localhost:9090/VentasBackEd/rest/";
  postPago: string = 'postPagar';
  prueba: string = 'login/'

  constructor(private http: Http) { }

  addUserParams(parametros: any) {
    if (parametros == null) {
      parametros = {};
    }
    parametros['user'] = {};
    parametros['pass'] = {};
    parametros.user = localStorage.getItem('user');
    parametros.pass = localStorage.getItem('pass');
    return parametros;
  }

  oracleGet(tabla: string, parametros: any): Observable<Response> {
    return this.http.get(this.url + tabla, {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString(),
    }).catch((error:Response)=>{
      if (error.status === 0) {
        alert(error.toString);
        //Conexión reusada, no hay conexión con el servidor
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error); 
    });
  }

  oraclePost(tabla, parametros): Observable<Response>  {
    //let body = new URLSearchParams(parametros).toString();
    return this.http.post(this.url + tabla, parametros, {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString()
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }

  getLogin(user: string, pass: string) {
    localStorage.setItem('user', user);
    localStorage.setItem('pass', pass);
    return this.oracleGet("login", null);
  }
  getLogout(parametros:any){
    return this.http.get(this.url + "logout" ,{
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString(),
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });

  }

  getRoles(search: string, parametros: any){
    return this.http.get(this.url + "verRoles", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString() + "&search=" + search,
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }

  getPrivilegios(search: string, parametros: any) {
    return this.http.get(this.url + "verPrivs", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString() + "&search=" + search,
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  getRegiones(search: string, parametros: any) {
    return this.http.get(this.url + "verRegiones", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString(),
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  getCategorias(search: string, parametros: any) {
    return this.http.get(this.url + "verCategorias", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString(),
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  getCliente(search: string, parametros: any) {
    return this.http.get(this.url + "verClientes", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString() + "&search=" + search,
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  getRepVentas(search: string, parametros: any) {
    return this.http.get(this.url + "verRepVentas", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString() + "&search=" + search,
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  getProductos(region: string,categoria:string, parametros: any) {
    return this.http.get(this.url + "verProductos", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString() 
      + "&region=" + region + "&categoria="+categoria,
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  getVenta( user ,venta: Venta,parametros: any) {
    return this.http.get(this.url + "verVenta", {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(parametros)).toString()
        + "&cod="+user+"&fecha=" + venta.fecha + "&precio=" + venta.precioFinal  ,
    }).catch((error: Response) => {
      if (error.status === 0) {
        //Conexión reusada, no hay conexión con el servidor
        alert(error.statusText)
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
    
  }
  
  postCliente(tabla, cliente :Cliente, codRep): Observable<Response> {
    let consulta = "&codigoRep=" + codRep + "&codigo=" + cliente.codigo + "&nombre=" + cliente.nombre +
     "&apellido="+ cliente.apellido + "&direccion=" + cliente.direccion + "&ciudad=" + cliente.ciudad +
     "&telefono="+ cliente.telefono + "&correo=" + cliente.correo;
    return this.http.post(this.url + "regCliente" , null , {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(null)).toString() + consulta
    }).catch((error: Response) => {
      if (error.status === 0) {
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  postVenta(tabla, cliente: Cliente, venta :Venta): Observable<Response> {
    let consulta = "&fecha=" + venta.fecha + "&precioFinal=" + venta.precioFinal + 
      "&estado=" + venta.estado + "&cedula=" + cliente.codigo;

    return this.http.post(this.url + "regVenta", null, {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(null)).toString() + consulta
    }).catch((error: Response) => {
      if (error.status === 0) {
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
  postVentaProd(tabla, producto: Producto, venta: Venta): Observable<Response> {
    let consulta = "&producto=" + producto.codigo + "&venta=" + venta.codigo +
      "&cantidad=" + producto.cantidad ;

    return this.http.post(this.url + "regVentaProd", null, {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(null)).toString() + consulta
    }).catch((error: Response) => {
      if (error.status === 0) {
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }

  postProductoRegion(tabla, producto: Producto, region: Region): Observable<Response> {
    let consulta = "&producto=" + producto.codigo + "&region=" +region.codigo +
      "&stock=" + producto.stock;

    return this.http.post(this.url + "actualizarStock", null, {
      headers: this.headers,
      params: new URLSearchParams(this.addUserParams(null)).toString() + consulta
    }).catch((error: Response) => {
      if (error.status === 0) {
        alert("Se ha producido un error. No hay conexión con el servidor")
      }
      else if (error.status === 500) {
        //Error interno del servidor
        alert("Se ha producido un error. Error interno en el servidor");
      } else if (error.status === 502) {
        //Bad gateway, servicio externo no respondió
        alert("Servicio externo inaccesible. Intente nuevamentes más tarde.");
      }
      return Observable.throw(error.json().error);
    });
  }
}
