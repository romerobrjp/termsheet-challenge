import { createAction, props } from '@ngrx/store';
import { RealEstateDeal } from '../shared/domain/real-state-deal';

export const dealFeatureKey = '[Deal]';
export const saveDeal = createAction(`${dealFeatureKey} Save Deal`, props<{ deal: RealEstateDeal }>());
export const clearDeal = createAction(`${dealFeatureKey} Remove Item`);
