import { createSelector } from '@ngrx/store';

import { OptionType } from '../../models/product';
import * as optionType from '../actions/option-type';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: OptionType };
  selectedOptionTypeId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedOptionTypeId: null,
};

export function reducer(
  state = initialState,
  action: optionType.Actions | collection.Actions
): State {
  switch (action.type) {
    case optionType.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const optionTypes = action.payload;
      const newOptionTypes = optionTypes.filter(optionType => !state.entities[optionType._id]);

      const newOptionTypeIds = newOptionTypes.map(optionType => optionType._id);
      const newOptionTypeEntities = newOptionTypes.reduce(
        (entities: { [id: string]: OptionType }, optionType: OptionType) => {
          return Object.assign(entities, {
            [optionType._id]: optionType,
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newOptionTypeIds],
        entities: Object.assign({}, state.entities, newOptionTypeEntities),
        selectedOptionTypeId: state.selectedOptionTypeId,
      };
    }

    case optionType.LOAD: {
      const optionType = action.payload;

      if (state.ids.indexOf(optionType._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, optionType._id],
        entities: Object.assign({}, state.entities, {
          [optionType._id]: optionType,
        }),
        selectedOptionTypeId: state.selectedOptionTypeId,
      };
    }

    case optionType.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedOptionTypeId: action.payload,
      };
    }

    case optionType.SAVE_SUCCESS: {
      const optionType = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [optionType._id]: optionType,
        }),
        selectedOptionTypeId: state.selectedOptionTypeId,
      };
    }

    case collection.REMOVE_OPTIONTYPE_SUCCESS: {
      const remove = action.payload;

      if (remove.soft === true) {
        return Object.assign({}, state, {
          ids: state.ids,
          entities: Object.assign({}, state.entities, {
            [remove.optionType._id]: remove.optionType,
          }),
          selectedOptionTypeId: state.selectedOptionTypeId,
        });
      }
      return state;
    }

    case collection.ADD_OPTIONTYPE_SUCCESS: {
      const optionType = action.payload;

      return {
        ids: [...state.ids, optionType._id],
        entities: Object.assign({}, state.entities, {
          [optionType._id]: optionType,
        }),
        selectedOptionTypeId: state.selectedOptionTypeId,
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

export const getSelectedId = (state: State) => state.selectedOptionTypeId;

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
