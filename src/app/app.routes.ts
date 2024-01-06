import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/deals', pathMatch: 'full' },
  {
    path: 'deals',
    loadComponent: () => import('./components/deals/deals.component').then(m => m.DealsComponent),
  },
];
