import { iActionTypes } from '../iAction';

interface Onboard {
  hasOnboarded: boolean;
}
export const changeOnboard = (payload: Onboard) => ({
  type: iActionTypes.ONBOARD_CHANGE,
  payload: payload,
});
