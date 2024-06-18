import { createReducer } from "@ngrx/store";

export interface State {
  // user: User;
  // accessToken: AccessToken | null;
  // authError: string | null;
  // loading: boolean;
}

const initialState: State = {
  // accessToken: null,
  // authError: null,
  // loading: false
};

const reducer = createReducer<State>(
  initialState,
);
