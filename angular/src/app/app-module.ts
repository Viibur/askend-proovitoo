import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FilterView } from './filter-view/filter-view';
import { FrontPage } from './front-page/front-page';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    App,
    FrontPage,
  ],
  imports: [
    FilterView,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectComponent,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [App],
})
export class AppModule {
}
