import { createAction, handleActions } from 'redux-actions';

// action type 설정
const CONFIRM_TEAMMATES = 'teamMates/CONFIRM_TEAMMATES';
const CHANGE_POSITION = 'teamMates/CHANGE_POSITION';

// action creator 함수
export const confirmTeamMates = createAction(
  CONFIRM_TEAMMATES,
  (inputTeamMates) => inputTeamMates,
);
export const changePosition = createAction(CHANGE_POSITION, ({ id, pos }) => ({
  id,
  pos,
}));

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
    [CHANGE_POSITION]: (state, { payload: { id, pos } }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id ? { ...teamMate, pos: pos } : teamMate,
      ),
    }),
  },
  initialState,
);

export default teamMates;
