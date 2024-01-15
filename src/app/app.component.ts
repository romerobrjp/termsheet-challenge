import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SharedModule,
    RouterOutlet,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TermSheet Deals';

  constructor(private router: Router, private loaderService: LoaderService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Iniate an HTTP request just to trigger the loader
        this.loaderService.testRequest();
      }
    });
  }
}
