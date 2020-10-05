import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import teamMates from './teamMates';
import enemies from './enemies';
import phase from './phase';
import allchampion, { allchampionSaga } from './allchampion';

const rootReducer = combineReducers({
  loading,
  teamMates,
  enemies,
  phase,
  allchampion,
});

export function* rootSaga() {
  yield all([allchampionSaga()]);
}

export default rootReducer;
