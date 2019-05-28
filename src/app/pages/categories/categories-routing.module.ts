import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    data: {
      title: 'Categories List'
    }
  },
  {
    path: 'new',
    component: CategoryFormComponent,
    data: {
      title: 'Categories Form'
    }
  },
  {
    path: ':id/edit',
    component: CategoryFormComponent,
    data: {
      title: 'Categories Form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
