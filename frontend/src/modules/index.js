import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import teamMates from './teamMates';
import enemies from './enemies';

const rootReducer = combineReducers({
  loading,
  teamMates,
  enemies,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
