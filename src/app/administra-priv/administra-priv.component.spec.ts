import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministraPrivComponent } from './administra-priv.component';

describe('AdministraPrivComponent', () => {
  let component: AdministraPrivComponent;
  let fixture: ComponentFixture<AdministraPrivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministraPrivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministraPrivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
