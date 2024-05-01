import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AccessToken } from '../../../generated-sources/openapi';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLoading = false;
  error: string | null = null;
  isLoginMode = true;

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;

    this.isLoading = true;
    let authObs: Observable<AccessToken>;

    if (this.isLoginMode) {
      // TODO: login
      authObs = this.authService.login(email, password);
    } else {
      // TODO: sign-up
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log('AuthObs Token ::', resData);
        this.isLoading = false;
        this.loginForm.reset();
        this.loginForm.markAsPristine();
        this.router.navigate(['/'])
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;

        alert(this.error); // this.showErrorAlert(errorMessage);
        this.onHandleError();

        this.isLoading = false;
      }
    );

  }

  onHandleError() {
    this.error = null;
  }
}
