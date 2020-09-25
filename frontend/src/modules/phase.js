import { createAction, handleActions } from 'redux-actions';

// action type
const CHANGE_TO_PICK_PHASE = 'phase/CHANGE_TO_PICK_PHASE';

// action creator 함수
export const changeToPickPhase = createAction(CHANGE_TO_PICK_PHASE);

// initial state
const initialState = {
  phase: 'ban',
};

// reducer
const phase = handleActions(
  {
    [CHANGE_TO_PICK_PHASE]: (state) => ({
      ...state,
      phase: 'pick',
    }),
  },
  initialState,
);

export default phase;
