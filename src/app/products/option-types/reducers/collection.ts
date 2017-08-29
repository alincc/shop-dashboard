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
      const optionTypes = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: optionTypes.map(optionType => optionType._id),
      };
    }

    case collection.ADD_OPTIONTYPE_SUCCESS:
    case collection.REMOVE_OPTIONTYPE_FAIL: {
      const optionType = action.payload;

      if (state.ids.indexOf(optionType._id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, optionType._id],
      });
    }

    case collection.REMOVE_OPTIONTYPE_SUCCESS: {
      const remove = action.payload;
      if (remove.soft === false) {
        return Object.assign({}, state, {
          ids: state.ids.filter(id => id !== remove.optionType._id),
        });
      }

      return state;
    }

    case collection.ADD_OPTIONTYPE_FAIL: {
      const optionType = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== optionType._id),
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
