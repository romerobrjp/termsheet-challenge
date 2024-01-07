import { createReducer, on } from '@ngrx/store';
import { RealEstateDeal } from '../shared/domain/real-state-deal';
import * as DealActions from './deal.actions';

export interface DealState {
  deal: RealEstateDeal | null;
}
export const initialState: DealState = { deal: null };

// const _dealReducer = createReducer(
//   initialState,
//   on(DealActions.saveDeal, (state, { deal }) => { 
//     console.log('>> on saveDeal state is: ', state);
//     console.log('>> on saveDeal deal is: ', deal);
    
//     return ({...state, deal})
//   }),
//   on(DealActions.clearDeal, (state) => ({...state, deal: null})),
// );

// export function dealReducer(state: any | undefined, action: Action) {
//   return _dealReducer(state, action);
// }

export const dealReducer = createReducer(
  initialState,
  on(DealActions.saveDeal, (state, { deal }) => { 
    console.log('>> on saveDeal state is: ', state);
    console.log('>> on saveDeal deal is: ', deal);
    
    return ({...state, deal});
  }),
  on(DealActions.clearDeal, (state) => ({...state, deal: null})),
);
