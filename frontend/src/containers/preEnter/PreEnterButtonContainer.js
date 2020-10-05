import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreEnterButton from '../../components/preEnter/PreEnterButton';
import { changeMe, confirmTeamMates } from '../../modules/teamMates';

const PreEnterButtonContainer = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { teamMates, meSelected } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    meSelected: teamMates.meSelected,
  }));
  const onMeSelected = (id) => {
    dispatch(changeMe(id));
    setModalOpen(false);
  };
  useEffect(() => {
    setModalOpen(false);
    // teamMates가 변화되었거나 첫 렌더링일때 useEffect는 실행
    if (teamMates) {
      // teamMates !== null 일때 => teamMates값을 로컬스토리지에 업데이트
      localStorage.setItem(
        'teamMates',
        JSON.stringify(
          teamMates.map((teamMate) => ({
            ...teamMate,
          })),
        ),
      );
    }
  }, [teamMates, dispatch]);
  return (
    <PreEnterButton
      activated={Boolean(teamMates)}
      completed={meSelected}
      onMeSelected={onMeSelected}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      teamMates={teamMates}
    />
  );
};

export default PreEnterButtonContainer;
