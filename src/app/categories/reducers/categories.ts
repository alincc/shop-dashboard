import { createSelector } from '@ngrx/store';
import { Category } from '../../model/interface';
import * as category from '../actions/category';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: Category };
  selectedCategoryId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedCategoryId: null,
};

export function reducer(
  state = initialState,
  action: category.Actions | collection.Actions
): State {
  switch (action.type) {
    case category.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const categories = action.payload;
      const newCategories = categories.filter(category => !state.entities[category._id]);

      const newCategoryIds = newCategories.map(category => category._id);
      const newCategoryEntities = newCategories.reduce(
        (entities: { [id: string]: Category }, category: Category) => {
          return Object.assign(entities, {
            [category._id]: category,
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newCategoryIds],
        entities: Object.assign({}, state.entities, newCategoryEntities),
        selectedCategoryId: state.selectedCategoryId,
      };
    }

    case category.LOAD: {
      const category = action.payload;

      if (state.ids.indexOf(category._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, category._id],
        entities: Object.assign({}, state.entities, {
          [category._id]: category,
        }),
        selectedCategoryId: state.selectedCategoryId,
      };
    }

    case category.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedCategoryId: action.payload,
      };
    }

    case category.SAVE_SUCCESS: {
      const category = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [category._id]: category,
        }),
        selectedCategoryId: state.selectedCategoryId,
      };
    }

    case collection.ADD_CATEGORY_SUCCESS: {
      const category = action.payload;

      return {
        ids: [...state.ids, category._id],
        entities: Object.assign({}, state.entities, {
          [category._id]: category,
        }),
        selectedCategoryId: state.selectedCategoryId,
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

export const getSelectedId = (state: State) => state.selectedCategoryId;

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
