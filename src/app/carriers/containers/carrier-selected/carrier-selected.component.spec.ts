import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierSelectedComponent } from './carrier-selected.component';

describe('CarrierSelectedComponent', () => {
  let component: CarrierSelectedComponent;
  let fixture: ComponentFixture<CarrierSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
