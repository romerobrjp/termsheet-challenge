import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../loader/loader.interceptor';

/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];
