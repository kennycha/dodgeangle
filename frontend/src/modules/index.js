import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import sample from './sample';
import loading from './loading';

const rootReducer = combineReducers({
  sample,
  loading,
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
