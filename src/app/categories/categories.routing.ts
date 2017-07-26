import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryViewComponent } from './containers/category-view.component';
import { CategoryCollectionComponent } from './containers/category-collection.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'categories', component: CategoryCollectionComponent },
    { path: 'category/:id', component: CategoryViewComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

export const routedComponents = [CategoryCollectionComponent, CategoryViewComponent];
