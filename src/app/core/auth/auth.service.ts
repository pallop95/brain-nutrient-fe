import { inject, Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { from, Observable, of, Subscription, take, tap } from 'rxjs';
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
import { AccessToken, AuthControllerService } from '../../../../generated-sources/openapi';
import * as fromAuths from './store/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  // private _firestore = inject(Firestore);
  /*
  private authState$ = authState(this.afAuth);
  private user$ = user(this.afAuth);
  private idToken$ = idToken(this.afAuth);
  */

  private accessToken$: Observable<AccessToken | null>;
  private isLoading$: Observable<boolean>;

  authSubscription: Subscription;
  private authToken: string | null = null;

  // isLoading$: Observable<boolean>;
  constructor(
    private authControllerService: AuthControllerService,
    private readonly store: Store,
    ) {
      this.accessToken$ = this.store.pipe(select(fromAuths.selectors.selectAuthAccessToken));
      this.isLoading$ = this.store.pipe(select(fromAuths.selectors.selectAuthIsLoading));

      this.authSubscription = this.accessToken$.subscribe((accessToken: AccessToken | null) => {
        // if (!accessToken) return;
        // debugger;
        this.authToken = accessToken?.access_token ?? null;
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  signUp(email: string, password: string): Observable<AccessToken> {
    // return from(createUserWithEmailAndPassword(this.afAuth, email, password));
    return this.authControllerService.authControllerRegister({ email, password });
  }

  login(email: string, password: string): Observable<AccessToken> {
    return this.authControllerService.authControllerLogin({ email, password })
      /*
      .pipe(
        tap(response => {
          if (response.access_token) this.setAuthToken(response.access_token);
        })
      );
      */
  }

  refreshToken(authToken: string) {
    console.log('refreshToken: authToken = ', authToken);
    return this.authControllerService.authControllerRefreshToken({ refreshToken: authToken });
  }

  logout(): Observable<any> {
    // this.clearAuthToken();
    this.store.dispatch(fromAuths.actions.logout());
    return of(true); // Assuming a successful logout action
  }

  isAuthenticated(): Observable<boolean> {
    return of(!!this.getAuthToken()); // Check if token exists
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  private refreshTokenTimer: any;
  setRefreshTokenTimer(expirationDuration: number) {
    this.refreshTokenTimer = setInterval(() => {
      if (!!this.authToken)
        this.store.dispatch(fromAuths.actions.refreshTokenStart({ authToken: this.authToken }));
    }, expirationDuration);
  }

  clearRefreshTokenTimer() {
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer);
      this.refreshTokenTimer = null;
    }
  }
  /*
  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
  */
}
