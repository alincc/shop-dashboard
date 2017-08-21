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
import * as fromOptionTypes from './option-types';
import * as fromCollection from './collection';
import * as fromRoot from '../../reducers';

export interface OptionTypesState {
  search: fromSearch.State;
  optionTypes: fromOptionTypes.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  'optionTypes': OptionTypesState;
}

export const reducers = {
  search: fromSearch.reducer,
  optionTypes: fromOptionTypes.reducer,
  collection: fromCollection.reducer,
};

export const getOptionTypesState = createFeatureSelector<OptionTypesState>('option-types');

export const getOptionTypeEntitiesState = createSelector(
  getOptionTypesState,
  (state: OptionTypesState) => state.optionTypes
);
export const getOptionTypeEntities = createSelector(
  getOptionTypeEntitiesState,
  fromOptionTypes.getEntities
);
export const getOptionTypeIds = createSelector(
  getOptionTypeEntitiesState,
  fromOptionTypes.getIds
);
export const getSelectedOptionTypeId = createSelector(
  getOptionTypeEntitiesState,
  fromOptionTypes.getSelectedId
);
export const getSelectedOptionType = createSelector(
  getOptionTypeEntitiesState,
  fromOptionTypes.getSelected
);

export const getSearchState = createSelector(
  getOptionTypesState,
  (state: OptionTypesState) => state.search
);

export const getSearchOptionTypeIds = createSelector(
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
  getOptionTypeEntities,
  getSearchOptionTypeIds,
  (optionTypes, searchIds) => {
    return searchIds.map(id => optionTypes[id]);
  }
);

export const getCollectionState = createSelector(
  getOptionTypesState,
  (state: OptionTypesState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionOptionTypeIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getOptionTypeCollection = createSelector(
  getOptionTypeEntities,
  getCollectionOptionTypeIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedOptionTypeInCollection = createSelector(
  getCollectionOptionTypeIds,
  getSelectedOptionTypeId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
