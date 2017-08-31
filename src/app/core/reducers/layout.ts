import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as layout from '../actions/layout';

export interface State {
  showSidenav: boolean;
  activeMenu: boolean | string;
  displayRemovedEntities: boolean;
}

const initialState: State = {
  showSidenav: true,
  activeMenu: null,
  displayRemovedEntities: false,
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        ...state,
        showSidenav: false,
      };

    case layout.OPEN_SIDENAV:
      return {
        ...state,
        showSidenav: true,
      };

    case layout.SELECT_ACTIVE_MENU: {
      const menu: string = action.payload;

      return {
        ...state,
        activeMenu: menu,
      };
    }

    case layout.TOGGLE_REMOVED_ENTITIES: {
      return {
        ...state,
        displayRemovedEntities: !state.displayRemovedEntities,
      }
    }

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;

export const getActiveMenu = (state: State) => state.activeMenu;

export const getLayoutState = createFeatureSelector<State>('layout');

export const getDisplayRemovedEntities = createSelector(
  getLayoutState,
  (state: State) => state.displayRemovedEntities,
);
