import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListContainerComponent } from './message-list-container.component';

describe('MessageListContainerComponent', () => {
  let component: MessageListContainerComponent;
  let fixture: ComponentFixture<MessageListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
