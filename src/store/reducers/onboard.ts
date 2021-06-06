import { iAction, iActionTypes } from '../iAction';

export interface iSuperOnboard {
  onboard: iOnboard;
}

export interface iOnboard {
  hasOnboarded: boolean;
}

const initialState: iOnboard = {
  hasOnboarded: false,
};

export const onboardReducer = (state = initialState, action: iAction) => {
  switch (action.type) {
    case iActionTypes.ONBOARD_CHANGE:
      return {
        ...state,
        hasOnboarded: true,
      };
    default:
      return state;
  }
};
