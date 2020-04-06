import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarCLienteComponent } from './seleccionar-cliente.component';

describe('SeleccionarCLienteComponent', () => {
  let component: SeleccionarCLienteComponent;
  let fixture: ComponentFixture<SeleccionarCLienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarCLienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarCLienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
