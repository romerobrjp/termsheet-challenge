import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from './loader.service';
import {Loader} from './loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription | undefined;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: Loader) => {
        this.show = state.show;
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
