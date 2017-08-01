import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '../index/index.component';
import { ThreadCollectionComponent } from './containers/thread-collection.component';
import { ThreadViewComponent } from './containers/thread-view.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'customer-service', component: ThreadCollectionComponent },
    { path: 'thread/:id', component: ThreadViewComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }

export const routedComponents = [ThreadCollectionComponent, ThreadViewComponent];
