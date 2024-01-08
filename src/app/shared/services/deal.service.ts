import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RealEstateDeal } from '../domain/real-state-deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private _deals: RealEstateDeal[] = [];
  _dealsSubject: BehaviorSubject<RealEstateDeal[]> = new BehaviorSubject<RealEstateDeal[]>(this._deals);
  _currentDeal: BehaviorSubject<RealEstateDeal | null> = new BehaviorSubject<RealEstateDeal | null>(null);
  
  constructor() { }

  get currentDeal() : BehaviorSubject<RealEstateDeal | null> {
    return this._currentDeal;
  }

  get deals$(): Observable<RealEstateDeal[]> {
    return this._dealsSubject.asObservable();
  }

  set deals$(deals: RealEstateDeal[]) {
    this._dealsSubject.next(deals);
    this._deals = deals;
  }

  saveDeal(deal: RealEstateDeal): void {
    this._currentDeal.next(deal);
  }

  clearDeal(): void {
    this._currentDeal.next(null);
  }

  updateDeal(updatedDeal: RealEstateDeal): void {
    const updatedDeals = this._deals.map(deal => {
      if (deal.id === updatedDeal.id) {
        return { ...deal, ...updatedDeal }; // Merge updated values into the specific Deal
      }
      return deal;
    });
    this._deals = updatedDeals;
    this._dealsSubject.next(updatedDeals);
  }

  addDeal(newDeal: RealEstateDeal): void {
    this._deals.push(newDeal);
    this._dealsSubject.next(this._deals);
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
}
