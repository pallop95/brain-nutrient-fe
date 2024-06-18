import { HttpErrorResponse } from "@angular/common/http";

export interface SuccessSnackbar {
  title: string;
  message: string;
}

export interface ErrorSnackbar extends HttpErrorResponse {}
