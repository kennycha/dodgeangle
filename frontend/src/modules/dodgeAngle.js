import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as dodgeAngleAPI from '../lib/api/dodgeAngle';
import { takeLatest } from 'redux-saga/effects';

// action type
const [
  GET_DODGEANGLE,
  GET_DODGEANGLE_SUCCESS,
  GET_DODGEANGLE_FAILURE,
] = createRequestActionTypes('dodgeAngle/GET_DODGEANGLE');
const INITIATE_DODGEANGLE = `dodgeAngle/INITIATE_DODGEANGLE`;

// action creator
export const getDodgeAngle = createAction(GET_DODGEANGLE, (params) => params);
export const initiateDodgeAngle = createAction(INITIATE_DODGEANGLE);

// saga
const getDodgeAngleSaga = createRequestSaga(
  GET_DODGEANGLE,
  dodgeAngleAPI.getDodgeAngle,
);
export function* dodgeAngleSaga() {
  yield takeLatest(GET_DODGEANGLE, getDodgeAngleSaga);
}

const initialState = {
  dodgeAngle: null,
  error: null,
};

// reducer
const dodgeAngle = handleActions(
  {
    [GET_DODGEANGLE_SUCCESS]: (
      state,
      { payload: { allyRate, enemyRate, dodgeAngle } },
    ) => ({
      ...state,
      dodgeAngle: {
        allyRate,
        enemyRate,
        dodgeAngle,
      },
    }),
    [GET_DODGEANGLE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INITIATE_DODGEANGLE]: (state) => ({
      state: initialState,
    }),
  },
  initialState,
);

export default dodgeAngle;
