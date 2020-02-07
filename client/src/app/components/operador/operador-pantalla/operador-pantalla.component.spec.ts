import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorPantallaComponent } from './operador-pantalla.component';

describe('OperadorPantallaComponent', () => {
  let component: OperadorPantallaComponent;
  let fixture: ComponentFixture<OperadorPantallaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorPantallaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
