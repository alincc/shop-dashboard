import { createSelector } from '@ngrx/store';
import { Carrier } from '../models/carrier';
import * as shipping from '../actions/carrier';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: Carrier };
  selectedCarrierId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedCarrierId: null,
};

export function reducer(
  state = initialState,
  action: shipping.Actions | collection.Actions
): State {
  switch (action.type) {
    case shipping.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const carriers = action.payload;
      const newCarriers = carriers.filter(carrier => !state.entities[carrier._id]);

      const newCarrierIds = newCarriers.map(carrier => carrier._id);
      const newCarrierEntities = newCarriers.reduce(
        (entities: { [id: string]: Carrier }, carrier: Carrier) => {
          return Object.assign(entities, {
            [carrier._id]: carrier,
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newCarrierIds],
        entities: Object.assign({}, state.entities, newCarrierEntities),
        selectedCarrierId: state.selectedCarrierId,
      };
    }

    case shipping.LOAD: {
      const carrier = action.payload;

      if (state.ids.indexOf(carrier._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, carrier._id],
        entities: Object.assign({}, state.entities, {
          [carrier._id]: carrier,
        }),
        selectedCarrierId: state.selectedCarrierId,
      };
    }

    case shipping.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedCarrierId: action.payload,
      };
    }

    case shipping.SAVE_SUCCESS: {
      const carrier = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [carrier._id]: carrier,
        }),
        selectedCarrierId: state.selectedCarrierId,
      };

      // return state;
    }

    case collection.ADD_SHIPPING_SUCCESS: {
      const carrier = action.payload;

      return {
        ids: [...state.ids, carrier._id],
        entities: Object.assign({}, state.entities, {
          [carrier._id]: carrier,
        }),
        selectedCarrierId: state.selectedCarrierId,
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

export const getSelectedId = (state: State) => state.selectedCarrierId;

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
