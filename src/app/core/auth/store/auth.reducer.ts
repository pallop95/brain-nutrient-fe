import { AccessToken } from "../../../../../generated-sources/openapi";
import * as AuthActions from './auth.actions';
import { Action, createReducer, on } from "@ngrx/store";

export interface State {
  // user: User;
  accessToken: AccessToken | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  accessToken: null,
  authError: null,
  loading: false
};
/*
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const accessToken = { ...action.payload };
      return {
        ...state,
        authError: null,
        accessToken, // user = new User(...)
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        accessToken: null, // user: null,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        accessToken: null, // user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
export function reducer(
  state = initialState,
  action: AuthActions.AuthActions
)
*/
const reducer = createReducer<State>(
  initialState,
  on(
    AuthActions.authenticateSuccess,
    (state, { accessToken }) => {
    // const accessToken = { ...state.payload };
    return {
      ...state,
      authError: null,
      accessToken: { ...accessToken },
      loading: false,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      accessToken: null,
    }
  }),
  on(AuthActions.loginStart, AuthActions.signupStart , (state, { email, password }) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),

  on(AuthActions.refreshTokenStart, (state, { authToken }) => {
    return {
      ...state,
      authError: null,
      loading: false,
    };
  }),
  on(AuthActions.authenticateFail , (state, { authError }) => {
    return {
      ...state,
      accessToken: null,
      authError: authError,
      loading: false,
    };
  }),
  //   case AuthActions.CLEAR_ERROR:
  //     return {
  //       ...state,
  //       authError: null
  //     };
  //   default:
  //     return state;
  // }
);

export function authReducer(state = initialState, actions: Action): State {
  const newState = reducer(state, actions);
  // console.log('State after action:', newState);
  return newState;
}
