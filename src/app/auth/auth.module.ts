import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule, routedComponents } from './auth.routing';
import { LoginFormComponent } from './components/login-form.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthEffects } from './effects/auth.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    AuthRoutingModule,
    SharedModule,

    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [routedComponents, LoginFormComponent],
  providers: [
    AuthGuard,
    AuthService,
  ]
})
export class AuthModule { }
