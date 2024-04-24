import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// export const routes: Routes = [
//   {
//     path: 'main',
//     loadComponent: () => import('./main/main.component').then((m) => m.MainComponent),
//   },
//   {
//     path: 'book',
//     loadComponent: () => import('./book/book.component').then((b) => b.BookComponent),
//   }
// ];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    // RouterModule.forRoot(routes),
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'brain-nutrient-fe';

  logout() {
    console.log('logout ...');
  }
}
