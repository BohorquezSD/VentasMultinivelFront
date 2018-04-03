import { Component, OnInit } from '@angular/core';
import { ConexionOracleService } from '../service/conexion-oracle.service';
import { Role } from '../roles/role'
import { Privilegio } from '../privilegios/privilegio'
import { Router} from '@angular/router'

@Component({
  selector: 'app-administra-priv',
  templateUrl: './administra-priv.component.html',
  styleUrls: ['./administra-priv.component.scss']
})
export class AdministraPrivComponent implements OnInit {

  constructor(private backEnd: ConexionOracleService,
              public router: Router) { }

  public busqueda ;
  public roles;
  public privs;
  
  public privilegio: Privilegio = new Privilegio();
  public role :Role =new Role();

  ngOnInit() {
  }

  verRoles() {
  if(this.validarCampos()){
    this.backEnd.getRoles(this.busqueda, null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.roles) {
          this.roles = jsonRespuesta.roles;
        } else {
          alert("Privilegios insuficientes \n" + jsonRespuesta.error);
        }  
      });
    }  
  }
  verPrivilegios() {
  if(this.validarCampos()){
    this.backEnd.getPrivilegios(this.busqueda, null).subscribe(
      respuesta => {
        let jsonRespuesta = respuesta.json();
        if (jsonRespuesta.privs) {
          this.privs = jsonRespuesta.privs;
        } else {
          alert("Privilegios insuficientes \n" + jsonRespuesta.error);
        }
      });
    }  
  }
  irAtras() {
    this.router.navigate(['home']);
  }
  validarCampos() {
    if (!this.busqueda) {
      alert("llene los campos necesarios");
      return false;
    }
    return true;
  }
  limpiar() {
    this.busqueda= ""
  }
}
