import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSelect from '../../components/main/UserSelect';

const UserSelectContainer = ({ champion }) => {
  const dispatch = useDispatch();
  const { teamMates, enemies, phase } = useSelector(
    ({ teamMates, enemies, phase }) => ({
      teamMates: teamMates.teamMates,
      enemies: enemies.enemies,
      phase: phase.phase,
    }),
  );
  const onClick = (event) => {
    // phase에 따른 분기
    const {
      target: { id },
    } = event;
    if (phase === 'ban') {
    } else {
    }
  };
  return <UserSelect onClick={onClick} />;
};

export default UserSelectContainer;
