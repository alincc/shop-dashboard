import * as orderActions from '../actions/order';

export interface State {
  ids: string[];
  loading: boolean;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  query: '',
};

export function reducer(state = initialState, action: orderActions.Actions): State {
  switch (action.type) {
    case orderActions.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          query,
        };
      }

      return Object.assign({}, state, {
        query,
        loading: true,
      });
    }

    case orderActions.SEARCH_COMPLETE: {
      const orders = action.payload;

      return {
        ids: orders.map(order => order._id),
        loading: false,
        query: state.query,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;
