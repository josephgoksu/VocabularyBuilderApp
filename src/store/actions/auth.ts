import { iActionTypes } from '../iAction';

interface UserSession {
  idToken: {};
}

interface Auth {
  loggedIn: boolean;
  user?: User;
  userSession?: UserSession;
}

interface User {
  username: string;
  fullname: string;
  email_verified: boolean;
  email: string;
}

export const hasLaunched = () => ({
  type: iActionTypes.HAS_LAUNCHED,
  payload: {
    hasLaunched: true,
  },
});

export const changeAuth = (payload: Auth) => ({
  type: iActionTypes.AUTH_CHANGE,
  payload,
});

export const logoutUser = () => ({
  type: iActionTypes.LOGOUT_USER,
});
