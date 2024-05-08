import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

// Custom operator for handling HTTP actions
export function handleHttpAction<T>(
  httpObservable: Observable<T>,
  successActionCreator: (payload: T) => Action,
  failureActionCreator: (error: HttpErrorResponse) => Action
): Observable<Action> {
  return httpObservable.pipe(
    mergeMap((data: T) => of(successActionCreator(data))),
    catchError((error: HttpErrorResponse) => of(failureActionCreator(error)))
  );
}

// Other utility functions or custom operators can be defined here
