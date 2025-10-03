import {NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {FilterView} from './filter-view/filter-view';
import {FrontPage} from './front-page/front-page';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    FilterView,
    FrontPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [App]
})
export class AppModule {
}
