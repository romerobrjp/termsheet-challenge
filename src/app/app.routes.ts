import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { dealReducer } from './store/deal.reducer';
import { dealFeatureKey } from './store/deal.actions';

export const routes: Routes = [
  { path: '', redirectTo: '/deals', pathMatch: 'full' },
  {
    path: 'deals',
    loadComponent: () => import('./components/deals/deals.component').then(m => m.DealsComponent),
    providers: [
      provideState({ name: dealFeatureKey, reducer: dealReducer })
    ]
  },
  {
    path: 'deal/:id',
    loadComponent: () => import('./components/deals/deal-detail/deal-detail.component').then(m => m.DealDetailComponent),
    providers: [
      provideState({ name: dealFeatureKey, reducer: dealReducer })
    ]
  },
  {
    path: 'deal/:id/edit',
    loadComponent: () => import('./components/deals/deal-edit/deal-edit.component').then(m => m.DealEditComponent),
    providers: [
      provideState({ name: dealFeatureKey, reducer: dealReducer })
    ]
  },
];
