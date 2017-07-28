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
import * as fromSearch from './search';
import * as fromCustomers from './customers';
import * as fromCollection from './collection';

export interface CustomersState {
  search: fromSearch.State;
  customers: fromCustomers.State;
  collection: fromCollection.State;
}

export interface State extends fromCustomers.State {
  'customers': CustomersState;
}

export const reducers = {
  search: fromSearch.reducer,
  customers: fromCustomers.reducer,
  collection: fromCollection.reducer,
};

export const getCustomersState = createFeatureSelector<CustomersState>('customers');

export const getCustomerEntitiesState = createSelector(
  getCustomersState,
  (state: CustomersState) => state.customers
);
export const getCustomerEntities = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getEntities
);
export const getCustomerIds = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getIds
);
export const getSelectedCustomerId = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getSelectedId
);
export const getSelectedCustomer = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getSelected
);

export const getSearchState = createSelector(
  getCustomersState,
  (state: CustomersState) => state.search
);

export const getSearchCustomerIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);

export const getSearchResults = createSelector(
  getCustomerEntities,
  getSearchCustomerIds,
  (customers, searchIds) => {
    return searchIds.map(id => customers[id]);
  }
);

export const getCollectionState = createSelector(
  getCustomersState,
  (state: CustomersState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionCustomerIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getCustomerCollection = createSelector(
  getCustomerEntities,
  getCollectionCustomerIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedCustomerInCollection = createSelector(
  getCollectionCustomerIds,
  getSelectedCustomerId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
