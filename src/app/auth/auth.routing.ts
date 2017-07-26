import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoutComponent } from './containers/logout/logout.component';
import { LoginPageComponent } from './containers/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

export const routedComponents = [LogoutComponent, LoginPageComponent];
