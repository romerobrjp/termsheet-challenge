export interface RealEstateDeal {
  id: number;
  name: string;
  type: 'Acquisition' | 'Lease' | 'Development';
  purchasePrice: number;
  address: string;
  noi: number;
  capRate: number;
}

type DealTypes = {
  acquisition: 'Acquisition',
  lease: 'Lease',
  development: 'Development',
}
