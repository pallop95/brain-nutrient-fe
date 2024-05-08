/*
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getAuthToken();

    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
*/
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
// import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('auth interceptor...', req);
  const authService = inject(AuthService);
  // const router = inject(Router);

  const authToken = authService.getAuthToken();

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
    //   .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     // Handle specific HTTP error status codes here
    //     if (error.status === 401) {
    //       // Handle Unauthorized error (e.g., redirect to login page)
    //       // this.router.navigate(['/login']);
    //       console.error('Unauthorized error:', error);
    //     } else if (error.status === 403) {
    //       // Handle Forbidden error
    //       console.error('Forbidden error:', error);
    //     } else if (error.status === 404) {
    //       // Handle Not Found error
    //       console.error('Not Found error:', error);
    //     } else {
    //       // Handle other errors
    //       console.error('Other error:', error);
    //     }
    //     // Pass the error along to the caller
    //     return throwError(error);
    //   })
    // );
  }

  return next(req);
}
