import * as optionTypeActions from '../actions/option-type';

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

export function reducer(state = initialState, action: optionTypeActions.Actions): State {
  switch (action.type) {
    case optionTypeActions.SEARCH: {
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

    case optionTypeActions.SEARCH_COMPLETE: {
      const optionTypes = action.payload;

      return {
        ids: optionTypes.map(optionType => optionType._id),
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
