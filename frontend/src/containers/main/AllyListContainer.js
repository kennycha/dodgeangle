import React from 'react';
import AllyList from '../../components/main/AllyList';
import { useSelector } from 'react-redux';
// import {
//   changePosition,
//   changeMe,
//   switching,
// } from '../../modules/teamMates';

const AllyListContainer = () => {
  // const dispatch = useDispatch();
  // const [dragged, setDragged] = useState();
  // const [over, setOver] = useState();
  const { teamMates, error } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    error: teamMates.error
  }));
  console.log("팀메이츠확인", teamMates)
  return (
    <AllyList
      teamMates={teamMates}
    />
  );
};

export default AllyListContainer;
