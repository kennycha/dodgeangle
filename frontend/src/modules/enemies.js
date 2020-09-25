import { createAction, handleActions } from 'redux-actions';

// action type 설정
const ENEMY_PICK_CHAMPION = 'enemies/ENEMY_PICK_CHAMPION';
const ENEMY_BAN_CHAMPION = 'enemies/ENEMY_BAN_CHAMPION';

// action creator 함수
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

// initial state
const initialState = {
  enemies: [
    {
      id: 0,
      ban: null,
      pick: null,
    },
    {
      id: 1,
      ban: null,
      pick: null,
    },
    {
      id: 2,
      ban: null,
      pick: null,
    },
    {
      id: 3,
      ban: null,
      pick: null,
    },
    {
      id: 4,
      ban: null,
      pick: null,
    },
  ],
  error: null,
};

// reducer
const enemies = handleActions(
  {
    [ENEMY_PICK_CHAMPION]: (state, { payload: { id, champion } }) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        enemy.id === id ? { ...enemy, pick: champion } : enemy,
      ),
    }),
    [ENEMY_BAN_CHAMPION]: (state, { payload: { id, champion } }) => ({
      ...state,
      enemies: state.enemies.map((enemy) =>
        enemy.id === id ? { ...enemy, ban: champion } : enemy,
      ),
    }),
  },
  initialState,
);

export default enemies;
