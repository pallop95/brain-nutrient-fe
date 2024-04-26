import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getCurrentUser().pipe(
    take(1),
    map(user => {
      console.log('user :: ', user);
      if (user) {
        return true;
      } else {
        return router.createUrlTree(['auth']);
        // router.navigate(['auth']);
        // return false;
      }
    })
  );
};
