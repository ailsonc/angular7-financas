import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

const routes: Routes = [
  {
    path: '',
    component: EntryListComponent,
    data: {
      title: 'Entries List'
    }
  },
  {
    path: 'new',
    component: EntryFormComponent,
    data: {
      title: 'Entries Form'
    }
  },
  {
    path: ':id/edit',
    component: EntryFormComponent,
    data: {
      title: 'Entries Form'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
