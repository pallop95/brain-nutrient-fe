import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromAuth from '../../core/auth/store/index';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <!-- {{ authIsLoading$ | async }} -->
    <div class="overlay" *ngIf="authIsLoading$ | async">
      <mat-progress-spinner [diameter]="50" [mode]="'indeterminate'"></mat-progress-spinner>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999; /* Ensure it appears above other content */
    }

    .spinner {
      /* Customize spinner styles if needed */
    }
  `],
  // templateUrl: './spinner.component.html',
  // styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnDestroy {
  authIsLoading$: Observable<boolean>;
  isLoadingSubscription: Subscription | undefined;

  constructor(private store: Store) {
    this.authIsLoading$ = this.store.select(fromAuth.selectors.selectAuthIsLoading);
    this.isLoadingSubscription = this.authIsLoading$.subscribe((isLoading) => {
      /*
      // You can perform additional actions based on isLoading state if needed
      if (isLoading) {
        console.log('Loading state is true. Additional actions can be performed here.');
        // For example, you can trigger an API call or fetch additional data
      } else {
        console.log('Loading state is false. Additional actions can be performed here.');
        // For example, you can stop an ongoing process or clear some data
      }
      */
      console.log('auth-isLoading ::',  isLoading);
    });
  }

  ngOnDestroy() {
    this.isLoadingSubscription?.unsubscribe();
  }
}
