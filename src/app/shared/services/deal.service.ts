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
}
