import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  compose,
  ActionReducer,
  combineReducers,
  Action,
  ActionReducerFactory,
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../environments/environment';
import * as fromLayout from '../core/reducers/layout';
import * as fromOrders from '../orders/reducers';
import * as fromThreads from '../messages/reducers';

export interface State {
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
};

export function logger(reducer: ActionReducer<State>) {
  return function(state: State, action: any) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const developmentReducerFactory: ActionReducerFactory<
  State,
  Action
> = compose(logger, combineReducers);

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

export const getActiveMenu = createSelector(
  getLayoutState,
  fromLayout.getActiveMenu,
);

export const getOrdersState = createFeatureSelector<fromOrders.State>('orders');
export const getThreadsState = createFeatureSelector<fromThreads.State>('threads');

export const getSelectedThreadOrder = createSelector(
  fromOrders.getOrderEntities,
  fromThreads.getSelectedThread,
  (orders, thread) => {
    if (!orders || !thread) return null;
    if (thread.order === null) return null;

    return orders[thread.order];
  }
);
