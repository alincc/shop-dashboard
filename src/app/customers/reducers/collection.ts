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
      const customers = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: customers.map(customer => customer._id),
      };
    }

    case collection.ADD_CUSTOMER_SUCCESS:
    case collection.REMOVE_CUSTOMER_FAIL: {
      const customer = action.payload;

      if (state.ids.indexOf(customer._id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, customer._id],
      });
    }

    case collection.REMOVE_CUSTOMER_SUCCESS:
    case collection.ADD_CUSTOMER_FAIL: {
      const customer = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== customer._id),
      });
    }

    case collection.REMOVE_MANY_CUSTOMERS_SUCCESS: {
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
