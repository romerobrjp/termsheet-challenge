export interface RealEstateDeal {
  name: string;
  type: 'Acquisition' | 'Lease' | 'Development';
  purchasePrice: number;
  address: string;
  noi: number;
  capRate: number;
}
