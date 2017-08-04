/*import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import * as fromSettings from './settings';
import * as fromRoot from '../../reducers';

export interface SettingsState {
  settings: fromSettings.State;
}

export interface State extends fromRoot.State {
  'settings': SettingsState;
}

export const reducers = fromSettings.reducer;

export const getSettingsState = createFeatureSelector<SettingsState>('settings');

export const getSettings = (state: State) => state.settings;

// export { getSelectedPage } from './settings';

export const getSelectedPage = (state: State) => state.settings.settings.selectedPage;*/


import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { ISettings, Settings, SettingsProperty } from '../models/settings';
import * as settings from '../actions/settings';

export interface SettingsState {
  properties: Settings;
  selectedPage: string;
  loaded: boolean;
  loading: boolean;
}

export interface State extends fromRoot.State {
  'settings': SettingsState;
}

export const initialState: SettingsState = {
  properties: {
    nrOfDecimals: 2,
    maintenanceMode: false,
    maintenanceText: '',
    displayProductQty: false,
  },
  selectedPage: 'general',
  loaded: false,
  loading: false,
};

export function reducers(
  state = initialState,
  action: settings.Actions
): SettingsState {
  switch (action.type) {
    case settings.LOAD: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case settings.SELECT_PAGE: {
      const page = action.payload;

      return Object.assign({}, state, {
        selectedPage: page,
      });
    }

    case settings.LOAD_SUCCESS: {
      const payload = action.payload;

      return {
        properties: payload,
        selectedPage: state.selectedPage,
        loaded: true,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}


export const getSettingsState = createFeatureSelector<SettingsState>('settings');

export const getSettings = (state: State) => state.settings;

export const getSelectedPage = (state: State) => state.settings.selectedPage;
