import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierCollectionComponent } from './carrier-collection.component';

describe('CarrierCollectionComponent', () => {
  let component: CarrierCollectionComponent;
  let fixture: ComponentFixture<CarrierCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
