import { Component } from '@angular/core';
import { DummyService } from './dummy.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.scss'
})
export class DummyComponent {
  constructor(private dummyService: DummyService, private snackBar: MatSnackBar) {}

  generateBadRequestError() {
    this.dummyService.generateBadRequestError().subscribe(
      (res) => {
        console.log('res ::', res);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  generateInternalServerError() {
    this.dummyService.generateInternalServerError().subscribe(
      (res) => {
        console.log('res ::', res);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  generateNotFoundError() {
    this.dummyService.generateNotFoundError().subscribe(
      (res) => {
        console.log('res ::', res);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  generateTimeoutError() {
    this.dummyService.generateTimeoutError().subscribe(
      (res) => {
        console.log('res ::', res);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  generateUnauthorizedError() {
    this.dummyService.generateUnauthorizedError().subscribe(
      (res) => {
        console.log('res ::', res);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  generateValidationError(id: number) {
    this.dummyService.generateValidationError(id).subscribe(
      (res) => {
        console.log('res ::', res);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Display error message using MatSnackBar or any other error handling mechanism
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
