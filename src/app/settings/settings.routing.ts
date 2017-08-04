import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './containers/settings-container.component';
import { SettingsGeneralComponent } from './components/settings-general.component';
import { SettingsProductsComponent } from './components/settings-products.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'settings', redirectTo: 'settings/general' },
    { path: 'settings/:page', component: SettingsContainerComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

export const routedComponents = [SettingsContainerComponent, SettingsProductsComponent];
