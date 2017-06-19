import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNoteFormComponent } from './customer-note-form.component';

describe('CustomerNoteFormComponent', () => {
  let component: CustomerNoteFormComponent;
  let fixture: ComponentFixture<CustomerNoteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNoteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
