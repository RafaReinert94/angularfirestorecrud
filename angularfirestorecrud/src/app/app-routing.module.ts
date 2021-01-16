import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/books/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/books/new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./pages/books/details/details.module').then(
        (m) => m.DetailsModule
      ),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/books/edit/edit.module').then((m) => m.EditModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
