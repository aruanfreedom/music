import { combineReducers } from 'redux';
import music from './musicReducer';

const musicApp = combineReducers({
  music,
});

export default musicApp;
