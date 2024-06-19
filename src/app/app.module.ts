import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiModule } from '../../generated-sources/openapi';
import { authInterceptor } from './core/auth/auth.interceptor';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  imports: [
    ApiModule,
    MaterialModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // provideHttpClient(
    //   withInterceptors([authInterceptor])
    // )
  ],
})
export class AppModule {}
