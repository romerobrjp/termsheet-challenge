import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LabelValue } from '../../shared/domain/label-value';
import { RealEstateDeal } from '../../shared/domain/real-state-deal';
import { DealService } from '../../shared/services/deal.service';
import { SharedModule } from '../../shared/shared.module';
import * as DealActions from '../../store/deal.actions';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})
export class DealsComponent implements OnInit {
  deals: RealEstateDeal[] = [];
  typesOptions: LabelValue[] = [];  

  constructor(private router: Router, private dealService: DealService, private store: Store<{ deal: { deal: RealEstateDeal } }>) {
    this.typesOptions = [
      { label: 'Acquisition', value: 'acquisition' },
      { label: 'Lease', value: 'lease' },
      { label: 'Development', value: 'development' },
    ];
  }

  ngOnInit(): void {
    this.dealService.deals$.subscribe({
      next: (deals) => {        
        if (!deals || deals.length === 0) {
          this.deals = this.generateListOfDeals(52);
          this.dealService.deals$ = this.deals;
        } else {
          console.log('>> else', deals);
          this.deals = deals;
        }
      }
    })
  }

  generateRandomDeal(): RealEstateDeal {
    const id = 0;
    const dealTypes = ['Acquisition', 'Lease', 'Development'];
    const name = `Deal ${Math.floor(Math.random() * 1000)}`;
    const type = dealTypes[Math.floor(Math.random() * dealTypes.length)] as 'Acquisition' | 'Lease' | 'Development';
    const purchasePrice = Math.floor(Math.random() * 1000000) + 50000; // Random purchase price between $50,000 and $1,050,000
    const address = `Address ${Math.floor(Math.random() * 1000)}`;
    const noi = Math.floor(Math.random() * 50000) + 1000; // Random NOI between $1,000 and $50,000
    const capRate = this.generateRandomCapRate(noi, purchasePrice);
  
    return {
      id,
      name,
      type,
      purchasePrice,
      address,
      noi,
      capRate,
    };
  }

  generateRandomCapRate(NOI: number, purchasePrice: number): number {
    // Generate a random cap rate within the range of 5% to 12%
    const minCapRate = 5;
    const maxCapRate = 12;
    
    // Calculate the maximum and minimum possible NOI based on the cap rate range
    const minNOI = purchasePrice * (minCapRate / 100);
    const maxNOI = purchasePrice * (maxCapRate / 100);
  
    // Ensure the provided NOI is within the possible range, if not, use minNOI or maxNOI
    const validNOI = Math.min(Math.max(NOI, minNOI), maxNOI);
  
    // Calculate the cap rate using the valid NOI
    const capRate = (validNOI / purchasePrice) * 100;
  
    return Number(capRate.toFixed(2));
  }

  generateListOfDeals(numDeals: number): RealEstateDeal[] {
    const deals: RealEstateDeal[] = [];
    for (let i = 0; i < numDeals; i++) {
      let deal = this.generateRandomDeal();
      deal.id = i+1;
      deals.push(deal);
    }
    return deals;
  }

  viewDeal($event: any, deal: RealEstateDeal) {
    console.log('> view deal $event.target.value:', $event.target.value);
    this.selectDeal(deal);
    this.router.navigate([`deal/${deal.id}`]);
  }

  goEditDeal($event: any, deal: RealEstateDeal) {
    this.selectDeal(deal);
    this.router.navigate([`deal/${deal.id}/edit`]);
  }

  selectDeal(deal: RealEstateDeal): void {
    this.dealService.saveDeal(deal);
    this.store.dispatch(DealActions.saveDeal({ deal: deal }));
  }
}
