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
      const products = action.payload;

      return {
        loaded: true,
        loading: false,
        ids: products.map(product => product._id),
      };
    }

    case collection.ADD_PRODUCT_SUCCESS:
    case collection.REMOVE_PRODUCT_FAIL: {
      const product = action.payload;

      if (state.ids.indexOf(product._id) > -1) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [...state.ids, product._id],
      });
    }

    case collection.REMOVE_PRODUCT_SUCCESS: {
      const remove = action.payload;

      if (remove.soft === false) {
        return Object.assign({}, state, {
          ids: state.ids.filter(id => id !== remove.product._id),
        });
      }
      
      return state;
    }

    case collection.ADD_PRODUCT_FAIL: {
      const product = action.payload;

      return Object.assign({}, state, {
        ids: state.ids.filter(id => id !== product._id),
      });
    }

    case collection.REMOVE_MANY_PRODUCTS_SUCCESS: {
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
