import { Action, createAction, props } from '@ngrx/store';
import { AccessToken } from '../../../../generated-sources/openapi';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

// export class AuthenticateSuccess implements Action {
//   readonly type = AUTHENTICATE_SUCCESS;

//   constructor(
//     public payload: {
//       // email: string;
//       // userId: string;
//       // token: string;
//       // expirationDate: Date;
//       // redirect: boolean;
//       accessToken: AccessToken;
//     }
//   ) {}
// }
export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    // book: Partial<IBook>;
    accessToken: AccessToken;
}>()
);

// export class Logout implements Action {
//   readonly type = LOGOUT;
// }
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
//   // | AutoLogin;
