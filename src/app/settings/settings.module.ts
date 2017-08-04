import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule, routedComponents } from './settings.routing';
import { SettingsBoxComponent } from './components/settings-box.component';
import { SettingsGeneralComponent } from './components/settings-general.component';
import { SettingsWrapperComponent } from './components/settings-wrapper.component';
import { SettingsService } from './settings.service';
import { SettingsEffects } from './effects/settings';
import { reducers } from './reducers';

@NgModule({
  imports: [
    SettingsRoutingModule,
    SharedModule,
    StoreModule.forFeature('settings', reducers),

    EffectsModule.forFeature([SettingsEffects]),
  ],
  declarations: [
    routedComponents,
    SettingsBoxComponent,
    SettingsGeneralComponent,
    SettingsWrapperComponent,
  ],
  providers: [
    SettingsService,
  ]
})
export class SettingsModule { }
