import { createAction, handleActions } from 'redux-actions';

// action type 설정
const CONFIRM_ENEMIES = 'enemies/CONFIRM_ENEMIES';
const ENEMY_PICK_CHAMPION = 'enemies/ENEMY_PICK_CHAMPION';
const ENEMY_BAN_CHAMPION = 'enemies/ENEMY_BAN_CHAMPION';
const SET_EXPECTED_CHAMPIONS = 'enemies/SET_EXPECTED_CHAMPIONS';
const SET_COUNTER_CHAMPIONS = 'enemies/SET_COUNTER_CHAMPIONS';

// action creator 함수
export const confirmEnemies = createAction(
  CONFIRM_ENEMIES,
  // null값이 입력으로 들어올때, 초기화 진행한다.
  (inputEnemies) => inputEnemies ? inputEnemies : [0, 1, 2, 3, 4].map((idx) => ({
    id: idx,
    ban: null,
    pick: null,
    expectedChampions: null,
    counterChampions: null,
  }))
);

export const enemyPickChampion = createAction(
  ENEMY_PICK_CHAMPION,
  ({ id, champion }) => ({
    id,
    champion,
  }),
);

export const enemyBanChampion = createAction(
  ENEMY_BAN_CHAMPION,
  ({ id, champion }) => ({
    id,
    champion,
  }),
);

export const setExpectedChampions = createAction(
  SET_EXPECTED_CHAMPIONS,
  ({ id, champions }) => ({ id, champions }),
);

export const setCounterChampions = createAction(
  SET_COUNTER_CHAMPIONS,
  ({ id, champions }) => ({ id, champions }),
);

// initial state
// localStorage에 값이 있다 => 해당 값을 활용한 초기화
const initialState = {
  enemies: localStorage.getItem('enemies')
    ? JSON.parse(localStorage.getItem('enemies'))
    : [0, 1, 2, 3, 4].map((idx) => ({
        id: idx,
        ban: null,
        pick: null,
        expectedChampions: null,
        counterChampions: null,
      })),
  error: null,
};

// reducer
const enemies = handleActions(
  {
    [CONFIRM_ENEMIES]: (state, { payload: inputEnemies }) => ({
      ...state,
      enemies: inputEnemies,
    }),
    [ENEMY_PICK_CHAMPION]: (state, { payload: { id, champion } }) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        enemy.id === id ? { ...enemy, pick: champion, counterChampions:null } : enemy,
      ),
    }),
    [ENEMY_BAN_CHAMPION]: (state, { payload: { id, champion } }) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        enemy.id === id ? { ...enemy, ban: champion, expectedChampions: null } : enemy,
      ),
    }),
    [SET_EXPECTED_CHAMPIONS]: (state, { payload: { id, champions } }) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        enemy.id === id
          ? { ...enemy, expectedChampions: champions }
          : enemy,
      ),
    }),
    [SET_COUNTER_CHAMPIONS]: (state, { payload: { id, champions } }) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        enemy.id === id
          ? { ...enemy, counterChampions: champions }
          : enemy,
      ),
    }),
  },
  initialState,
);

export default enemies;
