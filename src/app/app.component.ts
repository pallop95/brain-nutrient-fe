import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth/auth.service';

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
  private authService = inject(AuthService);
  isAuthRoute!: boolean;
  title = 'brain-nutrient-fe';

  constructor(
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (this.router.url === '/auth') {
        this.isAuthRoute = true;
      } else {
        this.isAuthRoute = false;
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Logout error:', err);
        // Handle error or retry logout if needed
      }
    });
  }
}
