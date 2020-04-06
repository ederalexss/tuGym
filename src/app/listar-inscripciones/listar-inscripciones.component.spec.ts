import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInscripcionesComponent } from './listar-inscripciones.component';

describe('ListarInscripcionesComponent', () => {
  let component: ListarInscripcionesComponent;
  let fixture: ComponentFixture<ListarInscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarInscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
