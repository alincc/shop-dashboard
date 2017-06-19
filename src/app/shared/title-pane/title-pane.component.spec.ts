import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitlePaneComponent } from './title-pane.component';

describe('TitlePaneComponent', () => {
  let component: TitlePaneComponent;
  let fixture: ComponentFixture<TitlePaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitlePaneComponent ]
    });

    TestBed.overrideComponent(TitlePaneComponent, {
      set: {
        template: `Overriden TitlePaneComponent`,
      },
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TitlePaneComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
