import { createSelector } from '@ngrx/store';
import { Order } from '../models/order';
import * as order from '../actions/order';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: Order };
  selectedOrderId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedOrderId: null,
};

export function reducer(
  state = initialState,
  action: order.Actions | collection.Actions
): State {
  switch (action.type) {
    case order.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const orders = action.payload;
      const newOrders = orders.filter(order => !state.entities[order._id]);

      const newOrderIds = newOrders.map(order => order._id);
      const newOrderEntities = newOrders.reduce(
        (entities: { [id: string]: Order }, order: Order) => {
          return Object.assign(entities, {
            [order._id]: new Order(order),
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newOrderIds],
        entities: Object.assign({}, state.entities, newOrderEntities),
        selectedOrderId: state.selectedOrderId,
      };
    }

    case order.LOAD: {
      const order = action.payload;

      if (state.ids.indexOf(order._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, order._id],
        entities: Object.assign({}, state.entities, {
          [order._id]: new Order(order),
        }),
        selectedOrderId: state.selectedOrderId,
      };
    }

    case order.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedOrderId: action.payload,
      };
    }

    case order.ADD_NEW_THREAD_SUCCESS: {
      const order = action.payload.order;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [order._id]: new Order(order),
        }),
        selectedOrderId: state.selectedOrderId,
      };
    }

    case order.SAVE_SUCCESS: {
      const order = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [order._id]: new Order(order),
        }),
        selectedOrderId: state.selectedOrderId,
      };
    }

    case collection.ADD_ORDER_SUCCESS: {
      const order = action.payload;

      return {
        ids: [...state.ids, order._id],
        entities: Object.assign({}, state.entities, {
          [order._id]: order,
        }),
        selectedOrderId: state.selectedOrderId,
      }
    }

    case order.ADD_PRODUCT_SUCCESS: {
      const order = action.payload;

      return {
        ids: [...state.ids, order._id],
        entities: Object.assign({}, state.entities, {
          [order._id]: new Order(order),
        }),
        selectedOrderId: state.selectedOrderId,
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

export const getSelectedId = (state: State) => state.selectedOrderId;

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
