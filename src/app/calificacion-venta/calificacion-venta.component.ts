import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion-venta',
  templateUrl: './calificacion-venta.component.html',
  styleUrls: ['./calificacion-venta.component.scss']
})
export class CalificacionVentaComponent implements OnInit {

  calificacion=3;

  constructor() { }

  ngOnInit() {
  }

  setCero(){
    this.calificacion=0;
  }

}
