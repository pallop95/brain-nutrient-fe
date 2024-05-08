import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/main/main.component').then((m) => m.MainComponent),
    canActivate: [ authGuard ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'book',
    loadChildren: () => import('./features/book/book.routes').then((mod) => mod.BOOK_ROUTES),
    canActivate: [ authGuard ],
    // loadComponent: () => import('./book/book.component').then((b) => b.BookComponent),
  }
];
