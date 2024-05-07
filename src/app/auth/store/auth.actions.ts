import { Action, createAction, props } from '@ngrx/store';
import { AccessToken } from '../../../../generated-sources/openapi';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const REFRESH_TOKEN_START = '[Auth] Refresh Token Start';
// export const REFRESH_TOKEN_SUCCESS = '[Auth] Refresh Token';
// export const CLEAR_ERROR = '[Auth] Clear Error';
// export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    // TODO: what is this partial 'book: Partial<IBook>;'
    accessToken: AccessToken;
    redirect: boolean;
}>()
);

export const logout = createAction(
  LOGOUT,
);

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ authError: string }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const refreshTokenStart = createAction(
  REFRESH_TOKEN_START,
  props<{ authToken: string }>()
);

// export class ClearError implements Action {
//   readonly type = CLEAR_ERROR;
// }

// // export class AutoLogin implements Action {
// //   readonly type = AUTO_LOGIN;
// // }

// export type AuthActions =
//   | AuthenticateSuccess
//   | Logout
//   | LoginStart
//   | AuthenticateFail
//   | SignupStart
//   | ClearError
// | REFRESH_TOKEN
//   // | AutoLogin;
