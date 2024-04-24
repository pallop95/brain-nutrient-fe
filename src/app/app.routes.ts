import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/main.component').then((m) => m.MainComponent),
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.routes').then((mod) => mod.BOOK_ROUTES)
    // loadComponent: () => import('./book/book.component').then((b) => b.BookComponent),
  }
];
