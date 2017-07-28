import * as customerActions from '../actions/customer';

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

export function reducer(state = initialState, action: customerActions.Actions): State {
  switch (action.type) {
    case customerActions.SEARCH: {
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

    case customerActions.SEARCH_COMPLETE: {
      const customers = action.payload;

      return {
        ids: customers.map(customer => customer._id),
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
