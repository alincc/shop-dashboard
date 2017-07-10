import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpService } from './http.service';
import { httpServiceFactory } from './http.factory';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    SidebarComponent,
    TopMenuComponent,
    LoaderComponent,
  ],
  declarations: [
    SidebarComponent,
    TopMenuComponent,
    NotFoundComponent,
    LoaderComponent,
  ],
  providers: [
    LoaderService,
    HttpService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HttpService,
          useFactory: httpServiceFactory,
          deps: [XHRBackend, RequestOptions, LoaderService ],
        }
      ]
    }
  }
}
