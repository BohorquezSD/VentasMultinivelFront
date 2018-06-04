import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionVentaComponent } from './calificacion-venta.component';

describe('CalificacionVentaComponent', () => {
  let component: CalificacionVentaComponent;
  let fixture: ComponentFixture<CalificacionVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
