import { createSelector } from '@ngrx/store';
import { Customer } from '../models/customer';
import * as customer from '../actions/customer';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: Customer };
  selectedCustomerId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
};

export function reducer(
  state = initialState,
  action: customer.Actions | collection.Actions
): State {
  switch (action.type) {
    case customer.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const customers = action.payload;
      const newCustomers = customers.filter(customer => !state.entities[customer._id]);

      const newCustomerIds = newCustomers.map(customer => customer._id);
      const newCustomerEntities = newCustomers.reduce(
        (entities: { [id: string]: Customer }, customer: Customer) => {
          return Object.assign(entities, {
            [customer._id]: new Customer(customer),
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newCustomerIds],
        entities: Object.assign({}, state.entities, newCustomerEntities),
        selectedCustomerId: state.selectedCustomerId,
      };
    }

    case customer.LOAD: {
      const customer = action.payload;

      if (state.ids.indexOf(customer._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, customer._id],
        entities: Object.assign({}, state.entities, {
          [customer._id]: customer,
        }),
        selectedCustomerId: state.selectedCustomerId,
      };
    }

    case customer.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedCustomerId: action.payload,
      };
    }

    case customer.SAVE_SUCCESS: {
      const customer = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [customer._id]: new Customer(customer),
        }),
        selectedCustomerId: state.selectedCustomerId,
      };
    }

    case collection.ADD_CUSTOMER_SUCCESS: {
      const customer = action.payload;

      return {
        ids: [...state.ids, customer._id],
        entities: Object.assign({}, state.entities, {
          [customer._id]: customer,
        }),
        selectedCustomerId: state.selectedCustomerId,
      }
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedCustomerId;

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => {
    return entities[selectedId];
  }
);

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
