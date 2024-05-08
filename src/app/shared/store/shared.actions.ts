// TODO: handling error (text) => call SnackBar error

import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { SuccessSnackbar } from "../services/models/http-handling.models";

const PREFIX_SHARED = '[Shared]';
export const CALL_SNACKBAR = `
  ${PREFIX_SHARED} Call Snackbar`;
// export const SHOW_ERROR_SNACKBAR = `
//   ${PREFIX_SHARED} SHOW Error Snackbar`;
// export const SHOW_SUCCESS_SNACKBAR = `
//   ${PREFIX_SHARED} SHOW Success Snackbar`;

// export const showSuccessSnackbar = createAction(
//   SHOW_SUCCESS_SNACKBAR,
//   props<{
//     error: SuccessSnackbar,
//   }>()
// );
// export const showErrorSnackbar = createAction(
//   SHOW_ERROR_SNACKBAR,
//   props<{
//     error: HttpErrorResponse,
//   }>()
// );
