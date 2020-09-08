import { createAction, handleActions } from 'redux-actions';

// action type
const SAMPLE_ACTION = 'sample/SAMPLE_ACTION';

// action 생성 함수
export const sampleAction = createAction(SAMPLE_ACTION);

// reducer initial state
const initialState = {};

// reducer
const sample = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,
  },
  initialState,
);

export default sample;
