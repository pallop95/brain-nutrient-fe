import { createSelector, createFeatureSelector } from "@ngrx/store";
import { State } from "./book.reducer";

const selectBookState = createFeatureSelector<State>('book');
export const selectBookList = createSelector(selectBookState, (state) => state.bookList);
export const selectSelectedBook = createSelector(selectBookState, (state) => state.selectedBook);
export const selectBookIsLoading = createSelector(selectBookState, (state) => state.isLoading);
