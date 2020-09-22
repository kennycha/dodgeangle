import { handleActions } from 'redux-actions';

// action type 설정

// action creator 함수

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
const enemies = handleActions({}, initialState);

export default enemies;
