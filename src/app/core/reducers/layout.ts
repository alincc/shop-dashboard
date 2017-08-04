import * as layout from '../actions/layout';

export interface State {
  showSidenav: boolean;
  activeMenu: boolean | string;
}

const initialState: State = {
  showSidenav: true,
  activeMenu: null,
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        showSidenav: false,
        activeMenu: state.activeMenu,
      };

    case layout.OPEN_SIDENAV:
      return {
        showSidenav: true,
        activeMenu: state.activeMenu,
      };

    case layout.SELECT_ACTIVE_MENU: {
      const menu: string = action.payload;

      return {
        ...state,
        activeMenu: menu,
      };
    }

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;

export const getActiveMenu = (state: State) => state.activeMenu;
