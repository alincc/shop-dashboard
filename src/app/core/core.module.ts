import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    SidebarComponent,
    TopMenuComponent,
  ],
  declarations: [
    SidebarComponent,
    TopMenuComponent,
    NotFoundComponent,
  ]
})
export class CoreModule { }
