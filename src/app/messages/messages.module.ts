import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule, routedComponents } from './messages.routing';
import { MessageListContainerComponent } from './message-list-container/message-list-container.component';
import { MessageService } from './message.service';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageFormComponent } from './message-form/message-form.component';

@NgModule({
  imports: [
    MessagesRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    MessageListContainerComponent,
    MessageItemComponent,
    MessageFormComponent,
  ],
  exports: [
    MessageItemComponent,
    MessageFormComponent,
  ],
  providers: [
    MessageService,
  ],
})
export class MessagesModule { }
