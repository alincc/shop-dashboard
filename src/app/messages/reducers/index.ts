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
import * as fromThreads from './threads';
import * as fromCollection from './collection';

export interface ThreadsState {
  search: fromSearch.State;
  threads: fromThreads.State;
  collection: fromCollection.State;
}

export interface State extends fromThreads.State {
  'threads': ThreadsState;
}

export const reducers = {
  search: fromSearch.reducer,
  threads: fromThreads.reducer,
  collection: fromCollection.reducer,
};

export const getThreadsState = createFeatureSelector<ThreadsState>('threads');

export const getThreadEntitiesState = createSelector(
  getThreadsState,
  (state: ThreadsState) => state.threads
);
export const getThreadEntities = createSelector(
  getThreadEntitiesState,
  fromThreads.getEntities
);
export const getThreadIds = createSelector(
  getThreadEntitiesState,
  fromThreads.getIds
);
export const getSelectedThreadId = createSelector(
  getThreadEntitiesState,
  fromThreads.getSelectedId
);
export const getSelectedThread = createSelector(
  getThreadEntitiesState,
  fromThreads.getSelected
);

export const getSearchState = createSelector(
  getThreadsState,
  (state: ThreadsState) => state.search
);

export const getSearchThreadIds = createSelector(
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
  getThreadEntities,
  getSearchThreadIds,
  (threads, searchIds) => {
    return searchIds.map(id => threads[id]);
  }
);

export const getCollectionState = createSelector(
  getThreadsState,
  (state: ThreadsState) => state.collection
);

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionThreadIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getThreadCollection = createSelector(
  getThreadEntities,
  getCollectionThreadIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedThreadInCollection = createSelector(
  getCollectionThreadIds,
  getSelectedThreadId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
