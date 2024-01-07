import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RealEstateDeal } from '../../../shared/domain/real-state-deal';
import { DealService } from '../../../shared/services/deal.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-deal-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './deal-detail.component.html',
  styleUrl: './deal-detail.component.scss',
})
export class DealDetailComponent {
  deal$: Observable<any>;
  item$ = this.store.select(state => state.deal.deal);
  deal: RealEstateDeal | null = null;

  constructor(private store: Store<any>, private dealService: DealService) {
    this.dealService.currentDeal.subscribe(value => {
      this.deal = value;
    });
    
    this.deal$ = this.store.select(state => state.deal);
    this.deal$ = store.select('deal');
  }
}
