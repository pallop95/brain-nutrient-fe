import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiModule } from '../../generated-sources/openapi';
import { authInterceptor } from './core/auth/auth.interceptor';

@NgModule({
  imports: [ApiModule],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // provideHttpClient(
    //   withInterceptors([authInterceptor])
    // )
  ],
})
export class AppModule {}
