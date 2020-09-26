import { createAction, handleActions } from 'redux-actions';

// action type 설정
const CONFIRM_TEAMMATES = 'teamMates/CONFIRM_TEAMMATES';
const CHANGE_POSITION = 'teamMates/CHANGE_POSITION';
const CHANGE_ME = 'teamMates/CHANGE_ME';
const SWITCHING = 'teamMates/SWITCHING';
const PICK_CHAMPION = 'teamMates/PICK_CHAMPION';
const BAN_CHAMPION = 'teamMates/BAN_CHAMPION';
const SET_MOST_CHAMPIONS = 'teamMates/SET_MOST_CHAMPIONS';

// action creator 함수
export const confirmTeamMates = createAction(
  CONFIRM_TEAMMATES,
  (inputTeamMates) => inputTeamMates,
);
export const changePosition = createAction(CHANGE_POSITION, ({ id, pos }) => ({
  id,
  pos,
}));

export const changeMe = createAction(CHANGE_ME, (id) => id);

export const switching = createAction(SWITCHING, ({ fromId, toId }) => ({
  fromId,
  toId,
}));

export const pickChampion = createAction(PICK_CHAMPION, ({ id, champion }) => ({
  id,
  champion,
}));

export const banChampion = createAction(BAN_CHAMPION, ({ id, champion }) => ({
  id,
  champion,
}));

export const setMostChampions = createAction(
  SET_MOST_CHAMPIONS,
  ({ id, champions }) => ({ id, champions }),
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
        teamMate.id === id ? { ...teamMate, pos: pos } : teamMate,
      ),
    }),
    [CHANGE_ME]: (state, { payload: id }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id
          ? { ...teamMate, me: true }
          : { ...teamMate, me: false },
      ),
    }),
    [SWITCHING]: (state, { payload: { fromId, toId } }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === fromId
          ? { ...state.teamMates[toId], id: teamMate.id } // id 값은 변하지 않고, 나머지 값은 from 과 to 사이에 swap된다
          : teamMate.id === toId
          ? { ...state.teamMates[fromId], id: teamMate.id }
          : teamMate,
      ),
    }),
    [PICK_CHAMPION]: (state, { payload: { id, champion } }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id ? { ...teamMate, pick: champion } : teamMate,
      ),
    }),
    [BAN_CHAMPION]: (state, { payload: { id, champion } }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id ? { ...teamMate, ban: champion } : teamMate,
      ),
    }),
    [SET_MOST_CHAMPIONS]: (state, { payload: { id, champions } }) => ({
      ...state,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id
          ? { ...teamMate, mostChampions: champions }
          : teamMate,
      ),
    }),
  },
  initialState,
);

export default teamMates;
