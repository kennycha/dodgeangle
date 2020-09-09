import { createAction, handleActions } from 'redux-actions';

// action type 설정
const CONFIRM_TEAMMATES = 'teamMates/CONFIRM_TEAMMATES';

// action creator 함수
export const confirmTeamMates = createAction(
  CONFIRM_TEAMMATES,
  (inputTeamMates) => inputTeamMates,
);

// initial state
const initialState = {
  teamMates: null,
  error: null,
};

// reducer
const teamMates = handleActions(
  {
    [CONFIRM_TEAMMATES]: (state, { payload: inputTeamMates }) => ({
      ...state,
      teamMates: inputTeamMates,
    }),
  },
  initialState,
);

export default teamMates;
