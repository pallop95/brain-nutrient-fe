import { createAction, props } from "@ngrx/store";
import { BookDto } from "../../../../../generated-sources/openapi";

const prefixBookAction = '[Book]';

export const GET_BOOKS_START = `${prefixBookAction} Get Books Start`;
export const GET_BOOKS_SUCCESS = `${prefixBookAction} Get Books Success`;

export const GET_BOOK_START = `${prefixBookAction} Get Book Start`;
export const GET_BOOK_SUCCESS = `${prefixBookAction} Get Book Success`;

export const CREATE_BOOK_START = `${prefixBookAction} Create Book Start`;
export const CREATE_BOOK_SUCCESS = `${prefixBookAction} Create Book Success`;

export const UPDATE_BOOK_START = `${prefixBookAction} Update Book Start`;
export const UPDATE_BOOK_SUCCESS = `${prefixBookAction} Update Book Success`;

export const DELETE_BOOK_START = `${prefixBookAction} Delete Book Start`;
export const DELETE_BOOK_SUCCESS = `${prefixBookAction} Delete Book Success`;

export const getBooksStart = createAction(
  GET_BOOKS_START,
);
export const getBooksSuccess = createAction(
  GET_BOOKS_SUCCESS,
  props<{
    bookList: BookDto[];
  }>()
);


export const getBookStart = createAction(
  GET_BOOK_START,
  props<{ id: string }>()
);
export const getBookSuccess = createAction(
  GET_BOOK_SUCCESS,
  props<{ selectedBook: BookDto }>()
);

export const createBookStart = createAction(
  CREATE_BOOK_START,
  props<{ newBook: BookDto }>()
);
export const createBookSuccess = createAction(
  CREATE_BOOK_SUCCESS,
  props<{ createdBook: BookDto }>()
);

export const updateBookStart = createAction(
  UPDATE_BOOK_START,
  props<{ updateBook: BookDto }>()
);
export const updateBookSuccess = createAction(
  UPDATE_BOOK_SUCCESS,
  // props<BookDto>()
);

export const deleteBookStart = createAction(
  DELETE_BOOK_START,
  props<{ id: string }>()
);
export const deleteBookSuccess = createAction(
  DELETE_BOOK_SUCCESS,
  // props<{ id: string }>()
);
