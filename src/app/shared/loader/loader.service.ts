import { Injectable } from '@angular/core';
import {Loader} from './loader';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new Subject<Loader>();
  loaderState = this.loaderSubject.asObservable();

  constructor(private http: HttpClient) {}

  show() {
    this.loaderSubject.next(<Loader>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<Loader>{ show: false });
  }

  testRequest() {
    this.show();
    this.http.get('https://reqres.in/api/users?delay=2').subscribe((res) => {
      // 250ms just to create the illusion that somehting is happening
      setTimeout(() => {
        this.hide();
      }, 250);
    });
  }
}
