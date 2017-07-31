import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { MessagesRoutingModule, routedComponents } from './messages.routing';
import { MessageListContainerComponent } from './components/message-list-container/message-list-container.component';
import { ThreadListComponent } from './components/thread-list.component';
import { ThreadDetailComponent } from './components/thread-detail.component';
import { ThreadStatusComponent } from './components/thread-status.component';
import { ThreadSelectedComponent } from './containers/thread-selected.component';
import { MessageService } from './message.service';
import { ThreadService } from './thread.service';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { CollectionEffects } from './effects/collection';
import { ThreadEffects } from './effects/thread';
import { reducers } from './reducers';

@NgModule({
  imports: [
    MessagesRoutingModule,
    SharedModule,
    StoreModule.forFeature('threads', reducers),

    EffectsModule.forFeature([ThreadEffects, CollectionEffects]),
  ],
  declarations: [
    routedComponents,
    MessageListContainerComponent,
    MessageItemComponent,
    MessageFormComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    ThreadStatusComponent,
    ThreadSelectedComponent,
  ],
  exports: [
    MessageItemComponent,
    MessageFormComponent,
  ],
  providers: [
    MessageService,
    ThreadService,
  ],
})
export class MessagesModule { }
