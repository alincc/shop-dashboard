import { createSelector } from '@ngrx/store';
import { Thread } from '../message';
import * as thread from '../actions/thread';
import * as collection from '../actions/collection';

export interface State {
  ids: string[];
  entities: { [id: string]: Thread };
  selectedThreadId: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedThreadId: null,
};

export function reducer(
  state = initialState,
  action: thread.Actions | collection.Actions
): State {
  switch (action.type) {
    case thread.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const threads = action.payload;
      const newThreads = threads.filter(thread => !state.entities[thread._id]);

      const newThreadIds = newThreads.map(thread => thread._id);
      const newThreadEntities = newThreads.reduce(
        (entities: { [id: string]: Thread }, thread: Thread) => {
          return Object.assign(entities, {
            [thread._id]: new Thread(thread),
          });
        },
        {}
      );

      return {
        ids: [...state.ids, ...newThreadIds],
        entities: Object.assign({}, state.entities, newThreadEntities),
        selectedThreadId: state.selectedThreadId,
      };
    }

    case thread.LOAD: {
      const thread = action.payload;

      if (state.ids.indexOf(thread._id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, thread._id],
        entities: Object.assign({}, state.entities, {
          [thread._id]: new Thread(thread),
        }),
        selectedThreadId: state.selectedThreadId,
      };
    }

    case thread.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedThreadId: action.payload,
      };
    }

    case thread.SAVE_SUCCESS: {
      const thread = action.payload;
  
      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [thread._id]: new Thread(thread),
        }),
        selectedThreadId: state.selectedThreadId,
      };
    }

    case collection.ADD_THREAD_SUCCESS: {
      const thread = action.payload;

      return {
        ids: [...state.ids, thread._id],
        entities: Object.assign({}, state.entities, {
          [thread._id]: new Thread(thread),
        }),
        selectedThreadId: state.selectedThreadId,
      }
    }

    case thread.ADD_MESSAGE_SUCCESS: {
      const thread = action.payload;

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, {
          [thread._id]: new Thread(thread),
        }),
        selectedThreadId: state.selectedThreadId,
      };
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

export const getSelectedId = (state: State) => state.selectedThreadId;

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
