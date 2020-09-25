import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import teamMates from './teamMates';
import enemies from './enemies';
import phase from './phase';

const rootReducer = combineReducers({
  loading,
  teamMates,
  enemies,
  phase,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
