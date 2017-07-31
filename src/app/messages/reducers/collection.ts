import * as collection from '../actions/collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(
  state = initialState,
  action: collection.Actions
): State {
  switch (action.type) {
    case collection.LOAD: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case collection.LOAD_SUCCESS: {
      const threads = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: threads.map(thread => thread._id),
      };
    }

    case collection.ADD_THREAD_SUCCESS:
    case collection.REMOVE_THREAD_FAIL: {
      const thread = action.payload;

      if (state.ids.indexOf(thread._id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, thread._id],
      });
    }

    case collection.REMOVE_THREAD_SUCCESS:
    case collection.ADD_THREAD_FAIL: {
      const thread = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== thread._id),
      });
    }

    case collection.REMOVE_MANY_THREADS_SUCCESS: {
      const removedIds = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => removedIds.indexOf(id) < 0),
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
