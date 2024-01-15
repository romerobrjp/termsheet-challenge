import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
    console.log('>> LoaderInterceptor constructor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>> LoaderInterceptor intercept');
    this.showLoader();

    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          console.log('>> interceptor tap event ');
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
        error: (err: any) => {
          console.log('>> interceptor tap error ');

          this.onEnd();
        }
      }),
      finalize(() => {
        this.onEnd();
      })
    );
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    console.log('>> interceptor showLoader ');
    this.loaderService.show();
  }

  private hideLoader(): void {
    console.log('>> interceptor hideLoader ');
    this.loaderService.hide()
  }
}
