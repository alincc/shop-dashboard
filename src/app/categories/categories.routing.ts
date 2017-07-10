import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListContainerComponent } from './category-list-container/category-list-container.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'categories', component: CategoryListContainerComponent },
    { path: 'category/:id', component: CategoryDetailComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

export const routedComponents = [CategoryListContainerComponent, CategoryDetailComponent];
