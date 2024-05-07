import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { AccessToken } from '../../../../generated-sources/openapi';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  accessToken: AccessToken,
  redirect: boolean,
) => {

  return AuthActions.authenticateSuccess({
    // email: email,
    // userId: userId,
    // token: token,
    // expirationDate: expirationDate,
    // redirect: true
    accessToken,
    redirect,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({ authError: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authenticateFail({ authError: errorMessage }));
};

@Injectable()
export class AuthEffects {
  /*
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            environment.firebaseAPIKey,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );
*/
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap(({email, password}) => {
        return this.authService.login(email, password)
      }))
        .pipe(
          /* TIPS: example resData
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          */
          tap(resData => {
            this.authService.setRefreshTokenTimer( 3 /* 60 * 5 */ * 1000);
          }),
          // TODO: can we reuse .pipe()?
          // TODO: merge login$ & authSignup$
          map(accessToken => {
            return handleAuthentication(accessToken, true);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
    )
  );

  refreshTokenStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REFRESH_TOKEN_START),
      switchMap(({ authToken }) => {
        return this.authService.refreshToken(authToken);
      }))
        .pipe(
          map(accessToken => {
            return handleAuthentication(accessToken, false);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
    )
  );

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap(({email, password}) => {
        return this.authService.signUp(email, password)
      }))
        .pipe(
          map(accessToken => {
            return handleAuthentication(accessToken, true);
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
    )
  );

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap(({ redirect }) => {
        if (!!redirect) {
          this.router.navigate(['/']);
        }
      })
    ),
    { dispatch: false } // Specify that this effect does not dispatch any actions
  );
/*
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });

        // const expirationDuration =
        //   new Date(userData._tokenExpirationDate).getTime() -
        //   new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );
  */

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(() => {
        // this.authService.clearLogoutTimer(); // clear for auth-login
        this.router.navigate(['/auth']);
      })
    ),
    { dispatch: false } // Specify that this effect does not dispatch any actions
  );
}
