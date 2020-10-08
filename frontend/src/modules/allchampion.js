import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as allchampionAPI from '../lib/api/allchampion';
import { takeLatest } from 'redux-saga/effects';

// action type
const [
  GET_ALLCHAMPION,
  GET_ALLCHAMPION_SUCCESS,
  GET_ALLCHAMPION_FAILURE,
] = createRequestActionTypes('allchampion/GET_ALLCHAMPION');

// action creator
export const getAllChampion = createAction(GET_ALLCHAMPION);

// saga
const getAllChampionSaga = createRequestSaga(
  GET_ALLCHAMPION,
  allchampionAPI.getAllChampion,
);
export function* allchampionSaga() {
  yield takeLatest(GET_ALLCHAMPION, getAllChampionSaga);
}

const initialState = {
  allchampion: null,
  error: null,
};

// reducer
const allchampion = handleActions(
  {
    [GET_ALLCHAMPION_SUCCESS]: (
      state,
      { payload: allchampion, meta: response },
    ) => ({
      ...state,
      allchampion: allchampion.sort((a, b) => (a.name < b.name ? -1 : 1)),
    }),
    [GET_ALLCHAMPION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default allchampion;
