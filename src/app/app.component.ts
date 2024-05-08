import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './core/auth/auth.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { Store } from '@ngrx/store';
import * as fromAuth from './core/auth/store/index'

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
    SpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // private authService = inject(AuthService);
  isAuthRoute!: boolean;
  title = 'brain-nutrient-fe';

  constructor(
    private router: Router,
    private store: Store,
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
    /*
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
    */
   this.store.dispatch(fromAuth.actions.logout());
  }
}
