import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as summonerAPI from '../lib/api/summoner';
import { takeLatest } from 'redux-saga/effects';

// action type 설정
const CONFIRM_TEAMMATES = 'teamMates/CONFIRM_TEAMMATES';
const CHANGE_POSITION = 'teamMates/CHANGE_POSITION';
const CHANGE_ME = 'teamMates/CHANGE_ME';
const INITIALIZE_ME = 'teamMates/INITIALIZE_ME';
const SWITCHING = 'teamMates/SWITCHING';
const PICK_CHAMPION = 'teamMates/PICK_CHAMPION';
const BAN_CHAMPION = 'teamMates/BAN_CHAMPION';
const SET_MOST_CHAMPIONS = 'teamMates/SET_MOST_CHAMPIONS';
// const FETCH_API_DATA = 'teamMates/FETCH_API_DATA';

const [
  GET_SUMMONERS_INFO,
  GET_SUMMONERS_INFO_SUCCESS,
  GET_SUMMONERS_INFO_FAILURE,
] = createRequestActionTypes('teamMates/GET_SUMMONERS_INFO');

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

export const initializeMe = createAction(INITIALIZE_ME);

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
  ({ summonerId, champions }) => ({ summonerId, champions }),
);

// export const fetchApiData = createAction(
//   FETCH_API_DATA,
//   ({
//     summoner,
//     streak_win,
//     streak_lose,
//     most_lane,
//     troll_index,
//     most_champion,
//   }) => ({
//     summoner,
//     streak_win,
//     streak_lose,
//     most_lane,
//     troll_index,
//     most_champion,
//   }),
// );

export const getSummonersInfo = createAction(
  GET_SUMMONERS_INFO,
  (summoners) => summoners,
);

// saga
const getSummonersInfoSaga = createRequestSaga(
  GET_SUMMONERS_INFO,
  summonerAPI.getSummonersInfo,
);
export function* teamMatesSaga() {
  yield takeLatest(GET_SUMMONERS_INFO, getSummonersInfoSaga);
}

// initial state
// 초기화시 localStorage값이 있으면 활용
const initialState = {
  teamMates: localStorage.getItem('teamMates')
    ? JSON.parse(localStorage.getItem('teamMates'))
    : null,
  meSelected: localStorage.getItem('meSelected')
    ? localStorage.getItem('meSelected')
    : false,
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
      meSelected: true,
      teamMates: state.teamMates.map((teamMate) =>
        teamMate.id === id
          ? { ...teamMate, me: true }
          : { ...teamMate, me: false },
      ),
    }),
    [INITIALIZE_ME]: (state) => ({
      ...state,
      meSelected: false,
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

    [GET_SUMMONERS_INFO_SUCCESS]: (
      state,
      {
        payload: summoners,
        meta: response,
      }) => ({
        ...state,
        gets: summoners,
        teamMates: state.teamMates.map((teamMate) => {
          let returnObject = { ...teamMate }
          summoners.forEach(summoner => {
            if (summoner.summoner === teamMate.name) {
              returnObject = {
                ...returnObject,
                badges: [
                  summoner.streak_win - summoner.streak_lose >= 0
                    ? summoner.streak_win - summoner.streak_lose + '연승중'
                    : -summoner.streak_win + summoner.streak_lose + '연패중',
                  '트롤지수 ' + summoner.troll_index,
                ],
                mostChampions: summoner.most_champion.slice(0, 3),
                trollIndex: summoner.troll_index,
                trollList: summoner.troll_list,
                recommendChamp: summoner.recommend_champ,
              }
            } 
          })
          return returnObject
      }),
    }),
    [GET_SUMMONERS_INFO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default teamMates;
