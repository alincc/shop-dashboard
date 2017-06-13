import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListContainerComponent } from './category-list-container.component';

describe('CategoryListContainerComponent', () => {
  let component: CategoryListContainerComponent;
  let fixture: ComponentFixture<CategoryListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
