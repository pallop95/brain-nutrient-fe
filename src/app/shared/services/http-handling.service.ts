import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from './models/http-handling.models';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlingService {

  constructor(private snackBar: MatSnackBar) { }

  handleSuccessSnackbar(success: SuccessSnackbar) {
    // Display error message using MatSnackBar or any other error handling mechanism
    this.snackBar.open(`${success.title}: ${success.message}`, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    // TODO: learn more about snackbar Ref
    // https://material.angular.io/components/snack-bar/examples
  }

  handleErrorSnackbar(error: HttpErrorResponse) {
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
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
