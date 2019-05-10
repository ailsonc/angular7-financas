import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { CategoriesFormComponent } from "./categories-form/categories-form.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
    data: {
      title: 'Categories List'
    }
  },
  {
    path: 'new',
    component: CategoriesFormComponent,
    data: {
      title: 'Categories Form'
    }
  },
  {
    path: ':id/edit',
    component: CategoriesFormComponent,
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
