import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PausaListComponent } from './pausa-list.component';

describe('PausaListComponent', () => {
  let component: PausaListComponent;
  let fixture: ComponentFixture<PausaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PausaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PausaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
