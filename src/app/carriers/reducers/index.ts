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
import * as fromCarriers from './carriers';
import * as fromCollection from './collection';

export interface CarriersState {
  search: fromSearch.State;
  carriers: fromCarriers.State;
  collection: fromCollection.State;
}

export interface State extends fromCarriers.State {
  'carriers': CarriersState;
}

export const reducers = {
  search: fromSearch.reducer,
  carriers: fromCarriers.reducer,
  collection: fromCollection.reducer,
};

export const getCarriersState = createFeatureSelector<CarriersState>('carriers');

export const getCarrierEntitiesState = createSelector(
  getCarriersState,
  (state: CarriersState) => state.carriers
);
export const getCarrierEntities = createSelector(
  getCarrierEntitiesState,
  fromCarriers.getEntities
);
export const getCarrierIds = createSelector(
  getCarrierEntitiesState,
  fromCarriers.getIds
);
export const getSelectedCarrierId = createSelector(
  getCarrierEntitiesState,
  fromCarriers.getSelectedId
);
export const getSelectedCarrier = createSelector(
  getCarrierEntitiesState,
  fromCarriers.getSelected
);

export const getSearchState = createSelector(
  getCarriersState,
  (state: CarriersState) => state.search
);

export const getSearchCarrierIds = createSelector(
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
  getCarrierEntities,
  getSearchCarrierIds,
  (carriers, searchIds) => {
    return searchIds.map(id => carriers[id]);
  }
);

export const getCollectionState = createSelector(
  getCarriersState,
  (state: CarriersState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionCarrierIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getCarrierCollection = createSelector(
  getCarrierEntities,
  getCollectionCarrierIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedCarrierInCollection = createSelector(
  getCollectionCarrierIds,
  getSelectedCarrierId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
