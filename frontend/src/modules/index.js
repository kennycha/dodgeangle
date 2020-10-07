import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import teamMates, { teamMatesSaga } from './teamMates';
import enemies from './enemies';
import phase from './phase';
import allchampion, { allchampionSaga } from './allchampion';
import dodgeAngle, { dodgeAngleSaga } from './dodgeAngle';

const rootReducer = combineReducers({
  loading,
  teamMates,
  enemies,
  phase,
  allchampion,
  dodgeAngle,
});

export function* rootSaga() {
  yield all([allchampionSaga(), teamMatesSaga(), dodgeAngleSaga()]);
}

export default rootReducer;
