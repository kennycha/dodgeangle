import { createAction, handleActions } from 'redux-actions';

// action type
const INITIALIZE_PHASE = 'phase/INITIALIZE_PHASE';
const CHANGE_PHASE = 'phase/CHANGE_PHASE';

// action creator 함수
export const initializePhase = createAction(INITIALIZE_PHASE);

export const changePhase = createAction(CHANGE_PHASE, ({ currentPhase }) => ({
  currentPhase,
}));

// initial state
const initialState = {
  phase: 'ban',
};

// reducer
const phase = handleActions(
  {
    [CHANGE_PHASE]: (state, { payload: { currentPhase } }) => ({
      ...state,
      phase: currentPhase === 'ban' ? 'pick' : 'complete',
    }),
    [INITIALIZE_PHASE]: (state) => ({
      ...state,
      phase: 'ban',
    }),
  },
  initialState,
);

export default phase;
