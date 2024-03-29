// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import { authReducer, onboardReducer, vocabularyReducer } from './reducers';

// Redux: Root Reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  onboard: onboardReducer,
  vocabulary: vocabularyReducer,
});
