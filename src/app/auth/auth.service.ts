import { inject, Injectable } from '@angular/core';
import { from, Observable, of, tap } from 'rxjs';
/*
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
  User,
  user,
  idToken,
} from "@angular/fire/auth";
import { Firestore } from 'firebase/firestore';
*/
import { AccessToken, AuthControllerService } from '../../../generated-sources/openapi';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _firestore = inject(Firestore);
  /*
  private authState$ = authState(this.afAuth);
  private user$ = user(this.afAuth);
  private idToken$ = idToken(this.afAuth);
  */
  private authToken: string | null = null;

  constructor(
    private authControllerService: AuthControllerService,
  ) { }

  signUp(email: string, password: string): Observable<AccessToken> {
    // return from(createUserWithEmailAndPassword(this.afAuth, email, password));
    return this.authControllerService.authControllerRegister({ email, password });
  }

  login(email: string, password: string): Observable<AccessToken> {
    return this.authControllerService.authControllerLogin({ email, password }).pipe(
      tap(response => {
        if (response.access_token) this.setAuthToken(response.access_token);
      })
    );
  }

  logout(): Observable<any> {
    this.clearAuthToken();
    return of(true); // Assuming a successful logout action
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!this.getAuthToken()); // Check if token exists
  }

  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  private setAuthToken(token: string): void {
    this.authToken = token;
    // Optionally, you can save the token to local storage or session storage for persistence
    localStorage.setItem('authToken', token);
  }

  private clearAuthToken(): void {
    this.authToken = null;
    // Clear the token from local storage or session storage
    localStorage.removeItem('authToken');
  }
}
