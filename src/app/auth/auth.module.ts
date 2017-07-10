import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule, routedComponents } from './auth.routing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,
  ],
  declarations: [routedComponents],
  providers: [
    AuthGuard,
    AuthService,
  ]
})
export class AuthModule { }
