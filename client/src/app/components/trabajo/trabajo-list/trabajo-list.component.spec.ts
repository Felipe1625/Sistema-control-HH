import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoListComponent } from './trabajo-list.component';

describe('TrabajoListComponent', () => {
  let component: TrabajoListComponent;
  let fixture: ComponentFixture<TrabajoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
