import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { switchMap, tap, map, catchError, of } from "rxjs";
import { BookDto } from "../../../../generated-sources/openapi";
import { BookService } from "../book.service";
import * as BookActions from './book.actions';
import { MatSnackBar } from "@angular/material/snack-bar";

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  console.log('errorMessage ::', errorMessage);
  // if (!errorRes.error || !errorRes.error.error) {
  //   return of(BookActions.authenticateFail({ authError: errorMessage }));
  // }
  // switch (errorRes.error.error.message) {
  //   case 'EMAIL_EXISTS':
  //     errorMessage = 'This email exists already';
  //     break;
  //   case 'EMAIL_NOT_FOUND':
  //     errorMessage = 'This email does not exist.';
  //     break;
  //   case 'INVALID_PASSWORD':
  //     errorMessage = 'This password is not correct.';
  //     break;
  // }
  // return of(BookActions.authenticateFail({ authError: errorMessage }));
};

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private bookService: BookService,
    private snackBar: MatSnackBar,
  ) {}

  getBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.GET_BOOKS_START),
      switchMap(() => {
        return this.bookService.getBooks()
      }),
      tap(() => console.log('Books got successfully:')),
      map((books: BookDto[]) => {
        return BookActions.getBooksSuccess({ bookList: books })
      }),
      // catchError(errorRes => {
      //   return handleError(errorRes);
      // })
    )
  });

  getBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.GET_BOOK_START),
      switchMap(({ id }) => {
        return this.bookService.getBookById(id)
      }),
      tap(() => console.log('Book got successfully:')),
      map((book: BookDto) => {
        return BookActions.getBookSuccess({ selectedBook: book })
      }),
    )
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.CREATE_BOOK_START),
      switchMap(({ newBook }) => {
        // const id = (action as any)?.id;
        return this.bookService.addBook(newBook);
      }),
      tap(() => console.log('Book create successfully:')),
      map((book: BookDto) => {
        return BookActions.createBookSuccess({ createdBook: book })
      }),
    )
  });

  createUpdateBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.CREATE_BOOK_SUCCESS, BookActions.UPDATE_BOOK_SUCCESS),
      tap((action: Action) => {
        console.log('action ::', action);

        /*
        switch (action.type) {
          case BookActions.GET_BOOKS_SUCCESS:

            break;
          case BookActions.UPDATE_BOOK_SUCCESS:

            break;
        }
        */
       // TODO: call notiService like LEXS-project
        this.snackBar.open(action.type, 'Close', {
          duration: 3000
        });
        this.router.navigate(['/book']);
      })
    ),
    { dispatch: false }
  );

  // deleteBookSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(BookActions.DELETE_BOOK_SUCCESS),
  //     tap((action: Action) => {
  //       console.log('action ::', action);

  //       // TODO: toast success using Angular-material.
  //       // this.router.navigate(['/book']);
  //       // return BookActions.getBooksStart();
  //     }),
  //     map(() => {
  //       return BookActions.getBooksStart();
  //     })
  //   )
  // });
  deleteBookSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.DELETE_BOOK_SUCCESS),
      map((action: Action) => {
        // TODO: call notiService like LEXS-project
        this.snackBar.open(action.type, 'Close', {
          duration: 3000
        });
        return BookActions.getBooksStart()
      })
    )
  );

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.UPDATE_BOOK_START),
      switchMap(({ updateBook }) => {
        // const id = (action as any)?.id;
        return this.bookService.updateBook(updateBook);
      }),
      tap(() => console.log('Book update successfully:')),
      map((book: BookDto | null) => {
        return BookActions.updateBookSuccess()
      }),
    )
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.DELETE_BOOK_START),
      switchMap(({ id }) => {
        // const id = (action as any)?.id;
        return this.bookService.deleteBook(id);
      }),
      tap(() => console.log('Book delete successfully:')),
      map(() => {
        return BookActions.deleteBookSuccess()
      }),
    )
  });
}
