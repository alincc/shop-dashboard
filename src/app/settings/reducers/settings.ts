// import { createSelector } from '@ngrx/store';
// import { ISettings, Settings, SettingsProperty } from '../models/settings';
// import * as settings from '../actions/settings';
//
// export interface State {
//   properties: Settings;
//   selectedPage: string;
//   loaded: boolean;
//   loading: boolean;
// }
//
// export const initialState: State = {
//   properties: {
//     nrOfDecimals: 2,
//     maintenanceMode: false,
//     maintenanceText: '',
//     displayProductQty: false,
//   },
//   selectedPage: 'general',
//   loaded: false,
//   loading: false,
// };
//
// export function reducer(
//   state = initialState,
//   action: settings.Actions
// ): State {
//   switch (action.type) {
//     case settings.LOAD: {
//       return Object.assign({}, state, {
//         loading: true,
//       });
//     }
//
//     case settings.SELECT_PAGE: {
//       const page = action.payload;
//
//       return Object.assign({}, state, {
//         selectedPage: page,
//       });
//     }
//
//     case settings.LOAD_SUCCESS: {
//       const payload = action.payload;
//
//       return {
//         properties: payload,
//         selectedPage: state.selectedPage,
//         loaded: true,
//         loading: false,
//       };
//     }
//
//     default: {
//       return state;
//     }
//   }
// }
//
// export const getSettings = (state: State) => state;
//
// export const getSelectedPage = (state: State) => state.selectedPage;
