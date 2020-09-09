import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import teamMates from './teamMates';

const rootReducer = combineReducers({
  loading,
  teamMates,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
