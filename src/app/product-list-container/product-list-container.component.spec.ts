import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListContainerComponent } from './product-list-container.component';

describe('ProductListContainerComponent', () => {
  let component: ProductListContainerComponent;
  let fixture: ComponentFixture<ProductListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListContainerComponent ]
    });

    TestBed.overrideComponent(ProductListContainerComponent, {
      set: {
        template: `Overriden ProductListContainerComponent`,
      },
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ProductListContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
