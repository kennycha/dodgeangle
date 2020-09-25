import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../components/main/UserSelect';
import { enemyBanChampion, enemyPickChampion } from '../../modules/enemies';
import { banChampion, pickChampion } from '../../modules/teamMates';

const UserSelectContainer = ({ champion }) => {
  const dispatch = useDispatch();
  const { phase } = useSelector(({ phase }) => ({
    phase: phase.phase,
  }));
  const onClick = (event) => {
    // phase에 따른 분기
    const {
      target: { id },
    } = event;
    if (phase === 'ban') {
      if (id[0] === 'A') {
        dispatch(banChampion({ id: parseInt(id[1]), champion }));
      } else {
        dispatch(enemyBanChampion({ id: parseInt(id[1]), champion }));
      }
    } else {
      if (id[0] === 'A') {
        dispatch(pickChampion({ id: parseInt(id[1]), champion }));
      } else {
        dispatch(enemyPickChampion({ id: parseInt(id[1]), champion }));
      }
    }
  };
  return <UserSelect onClick={onClick} />;
};

export default UserSelectContainer;
