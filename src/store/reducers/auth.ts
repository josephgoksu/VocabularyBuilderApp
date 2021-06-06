import { iAction, iActionTypes } from '../iAction';

export interface iSuperAuth {
  Auth: iAuth;
}

export interface iAuth {
  loggedIn: boolean;
  hasLaunched: boolean;
}

const initialState: iAuth = {
  loggedIn: false,
  hasLaunched: false,
};

export const authReducer = (state = initialState, action: iAction) => {
  switch (action.type) {
    case iActionTypes.HAS_LAUNCHED:
      return {
        ...state,
        hasLaunched: true,
      };

    case iActionTypes.AUTH_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case iActionTypes.LOGOUT_USER:
      return {};

    default:
      return state;
  }
};
