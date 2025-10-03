import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontPage} from './front-page/front-page';
import {FilterView} from './filter-view/filter-view';

const routes: Routes = [
  {
    path: '',
    component: FrontPage,
  }, {
    path: 'filter/:id',
    component: FilterView,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
