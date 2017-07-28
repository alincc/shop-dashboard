import { createSelector } from '@ngrx/store';
import { Product } from '../../model/interface';
import * as product from '../actions/product';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: Product };
  selectedProductId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedProductId: null,
};

export function reducer(
  state = initialState,
  action: product.Actions | collection.Actions
): State {
  switch (action.type) {
    case product.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const products = action.payload;
      const newProducts = products.filter(product => !state.entities[product._id]);

      const newProductIds = newProducts.map(product => product._id);
      const newProductEntities = newProducts.reduce(
        (entities: { [id: string]: Product }, product: Product) => {
          return Object.assign(entities, {
            [product._id]: new Product(product),
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newProductIds],
        entities: Object.assign({}, state.entities, newProductEntities),
        selectedProductId: state.selectedProductId,
      };
    }

    case product.LOAD: {
      const product = action.payload;

      if (state.ids.indexOf(product._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, product._id],
        entities: Object.assign({}, state.entities, {
          [product._id]: product,
        }),
        selectedProductId: state.selectedProductId,
      };
    }

    case product.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedProductId: action.payload,
      };
    }

    case product.SAVE_SUCCESS: {
      const product = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [product._id]: new Product(product),
        }),
        selectedProductId: state.selectedProductId,
      };
    }

    case collection.REMOVE_PRODUCT_SUCCESS: {
      const remove = action.payload;

      if (remove.soft === true) {
        return Object.assign({}, state, {
          ids: state.ids,
          entities: Object.assign({}, state.entities, {
            [remove.product._id]: new Product(remove.product),
          }),
          selectedProductId: state.selectedProductId,
        });
      }
      return state;
    }

    case collection.ADD_PRODUCT_SUCCESS: {
      const product = action.payload;

      return {
        ids: [...state.ids, product._id],
        entities: Object.assign({}, state.entities, {
          [product._id]: new Product(product),
        }),
        selectedProductId: state.selectedProductId,
      }
    }

    case collection.RESTORE_SUCCESS: {
      const product = action.payload;

      return {
        ids: [...state.ids, product._id],
        entities: Object.assign({}, state.entities, {
          [product._id]: new Product(product),
        }),
        selectedProductId: state.selectedProductId,
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

export const getSelectedId = (state: State) => state.selectedProductId;

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
