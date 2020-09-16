import { createAction, handleActions } from 'redux-actions';

// action type 설정
const CONFIRM_TEAMMATES = 'teamMates/CONFIRM_TEAMMATES';
const CHANGE_POSITION = 'teamMates/CHANGE_POSITION';
const CHANGE_ME = 'teamMates/CHANGE_ME'

// action creator 함수
export const confirmTeamMates = createAction(
  CONFIRM_TEAMMATES,
  (inputTeamMates) => inputTeamMates,
);
export const changePosition = createAction(CHANGE_POSITION, ({ id, pos }) => ({
  id,
  pos,
}));

export const changeMe = createAction(
  CHANGE_ME,
  (id) => id,
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
    [CHANGE_POSITION]: (state, { payload: { id, pos } }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id ? { ...teamMate, pos: pos, me: true } : teamMate,
      ),
    }),
    [CHANGE_ME]: (state, { payload: id }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id ? { ...teamMate, me: true } : { ...teamMate, me: false }
      ),
    }),
  },
  initialState,
);

export default teamMates;
