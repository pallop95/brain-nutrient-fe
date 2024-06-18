import { Action, createReducer, on } from "@ngrx/store";
import { BookDto } from "../../../../../generated-sources/openapi";
import * as BookActions from './book.actions';

export interface State {
  bookList: BookDto[] | null;
  selectedBook: BookDto | null;
  isLoading: boolean;
  bookError: string | null;
}

const initialState: State = {
  bookList: null,
  selectedBook: null,
  bookError: null,
  isLoading: false,
}
// ###
const reducer = createReducer<State>(
  initialState,
  on(BookActions.getBooksStart, (state) => {
    return {
      ...state,
      bookError: null,
      isLoading: true,
    };
  }),
  on(BookActions.getBooksSuccess, (state, { bookList }) => {
    return {
      ...state,
      bookList,
      isLoading: false,
    };
  }),

  on(BookActions.getBookStart, (state,  { id }) => {
    return {
      ...state,
      bookError: null,
      isLoading: true,
    };
  }),
  on(BookActions.getBookSuccess, (state, { selectedBook }) => {
    return {
      ...state,
      selectedBook,
      isLoading: false,
    };
  }),

  on(BookActions.createBookStart, (state, { newBook }) => {
    return {
      ...state,
      bookError: null,
      isLoading: true,
    };
  }),
  on(BookActions.createBookSuccess, (state, { createdBook }) => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(BookActions.updateBookStart, (state, { updateBook }) => {
    return {
      ...state,
      bookError: null,
      isLoading: true,
    };
  }),
  on(BookActions.updateBookSuccess, (state) => {
    return {
      ...state,
      selectedBook: null,
      isLoading: false,
    };
  }),

  on(BookActions.deleteBookStart, (state, { id }) => {
    return {
      ...state,
      bookError: null,
      isLoading: true,
    };
  }),
  on(BookActions.deleteBookSuccess, (state) => {
    return {
      ...state,
      bookError: null,
      isLoading: false,
    };
  }),
);

// ###
export function bookReducer(state = initialState, actions: Action): State {
  const newState = reducer(state, actions);
  return newState;
}
