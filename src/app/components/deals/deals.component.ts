import { Component, OnInit } from '@angular/core';
import { RealEstateDeal } from '../../shared/domain/real-state-deal';
import { LabelValue } from '../../shared/domain/label-value';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

  constructor() {
    this.deals = this.generateListOfDeals(25);
    this.typesOptions = [
      { label: 'Acquisition', value: 'acquisition' },
      { label: 'Lease', value: 'lease' },
      { label: 'Development', value: 'development' },
    ];
  }

  ngOnInit(): void {
    console.log('>> onInit', this.deals);    
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
  
    return Number(capRate.toFixed(4));
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
}
