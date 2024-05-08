import { Routes } from '@angular/router';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./book.component').then((m) => m.BookComponent),
  },
  {
    path: 'book-form',
    loadComponent: () => import('./book-form/book-form.component').then((b) => b.BookFormComponent),
  }
];
