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
import * as fromProducts from './products';
import * as fromCollection from './collection';

export interface ProductsState {
  search: fromSearch.State;
  products: fromProducts.State;
  collection: fromCollection.State;
}

export interface State extends fromProducts.State {
  'products': ProductsState;
}

export const reducers = {
  search: fromSearch.reducer,
  products: fromProducts.reducer,
  collection: fromCollection.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProductEntitiesState = createSelector(
  getProductsState,
  (state: ProductsState) => state.products
);
export const getProductEntities = createSelector(
  getProductEntitiesState,
  fromProducts.getEntities
);
export const getProductIds = createSelector(
  getProductEntitiesState,
  fromProducts.getIds
);
export const getSelectedProductId = createSelector(
  getProductEntitiesState,
  fromProducts.getSelectedId
);
export const getSelectedProduct = createSelector(
  getProductEntitiesState,
  fromProducts.getSelected
);

export const getSearchState = createSelector(
  getProductsState,
  (state: ProductsState) => state.search
);

export const getSearchProductIds = createSelector(
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
  getProductEntities,
  getSearchProductIds,
  (products, searchIds) => {
    return searchIds.map(id => products[id]);
  }
);

export const getCollectionState = createSelector(
  getProductsState,
  (state: ProductsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionProductIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getProductCollection = createSelector(
  getProductEntities,
  getCollectionProductIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedProductInCollection = createSelector(
  getCollectionProductIds,
  getSelectedProductId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
