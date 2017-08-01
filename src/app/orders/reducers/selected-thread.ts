import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  compose,
  ActionReducer,
  combineReducers,
  Action,
  ActionReducerFactory,
  MemoizedSelector,
} from '@ngrx/store';

import * as fromThreads from '../../messages/reducers';
import { getSelectedOrder } from './index';

export const getSelectedOrderThread = createSelector(
  getSelectedOrder,
  fromThreads.getThreadEntities,
  (order, threadEntities) => {
    if (!order || !threadEntities) return null;
    if (order.thread == null) return null;

    return threadEntities[order.thread._id]
  }
)
