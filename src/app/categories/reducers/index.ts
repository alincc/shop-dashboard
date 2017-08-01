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
import * as fromCategories from './categories';
import * as fromCollection from './collection';
import * as fromRoot from '../../reducers';

export interface CategoriesState {
  search: fromSearch.State;
  categories: fromCategories.State;
  collection: fromCollection.State;
}

export interface State extends fromRoot.State {
  'categories': CategoriesState;
}

export const reducers = {
  search: fromSearch.reducer,
  categories: fromCategories.reducer,
  collection: fromCollection.reducer,
};

export const getCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const getCategoryEntitiesState = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.categories
);
export const getCategoryEntities = createSelector(
  getCategoryEntitiesState,
  fromCategories.getEntities
);
export const getCategoryIds = createSelector(
  getCategoryEntitiesState,
  fromCategories.getIds
);
export const getSelectedCategoryId = createSelector(
  getCategoryEntitiesState,
  fromCategories.getSelectedId
);
export const getSelectedCategory = createSelector(
  getCategoryEntitiesState,
  fromCategories.getSelected
);

export const getSearchState = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.search
);

export const getSearchCategoryIds = createSelector(
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
  getCategoryEntities,
  getSearchCategoryIds,
  (categories, searchIds) => {
    return searchIds.map(id => categories[id]);
  }
);

export const getCollectionState = createSelector(
  getCategoriesState,
  (state: CategoriesState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionCategoryIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getCategoryCollection = createSelector(
  getCategoryEntities,
  getCollectionCategoryIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedCategoryInCollection = createSelector(
  getCollectionCategoryIds,
  getSelectedCategoryId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
