import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RealEstateDeal } from './shared/models/real-state-deal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TermSheet Deals';
  deals: RealEstateDeal[] = [];

  constructor() {
    this.deals = this.generateListOfDeals(25);
  }

  ngOnInit(): void {
    console.log('>> onInit', this.deals);
    
  }

  generateRandomDeal(): RealEstateDeal {
    const dealTypes = ['Acquisition', 'Lease', 'Development'];
    const dealName = `Deal ${Math.floor(Math.random() * 1000)}`;
    const dealType = dealTypes[Math.floor(Math.random() * dealTypes.length)] as 'Acquisition' | 'Lease' | 'Development';
    const purchasePrice = Math.floor(Math.random() * 1000000) + 50000; // Random purchase price between $50,000 and $1,050,000
    const address = `Address ${Math.floor(Math.random() * 1000)}`;
    const NOI = Math.floor(Math.random() * 50000) + 1000; // Random NOI between $1,000 and $50,000
    const capRate = (NOI / purchasePrice) * 100;
  
    return {
      name: dealName,
      type: dealType,
      purchasePrice,
      address,
      noi: NOI,
      capRate,
    };
  }

  generateListOfDeals(numDeals: number): RealEstateDeal[] {
    const deals: RealEstateDeal[] = [];
    for (let i = 0; i < numDeals; i++) {
      deals.push(this.generateRandomDeal());
    }
    return deals;
  }
}
