import * as auth from '../actions/auth';
import { User } from '../../model/interface';

export interface State {
  loggedIn: boolean;
  checked: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  checked: false,
  user: null,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case auth.LOGOUT: {
      return initialState;
    }

    case auth.CHECK: {
      return {
        ...state,
        checked: true,
      }
    }

    default: {
      return state;
    }
  }
}


export const getStatus = (state: State) => state;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getChecked = (state: State) => state.checked;
export const getUser = (state: State) => state.user;
