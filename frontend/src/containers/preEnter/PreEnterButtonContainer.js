import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PreEnterButton from '../../components/preEnter/PreEnterButton';
import { changeMe, getSummonersInfo } from '../../modules/teamMates';

const PreEnterButtonContainer = () => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { teamMates, meSelected } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    meSelected: teamMates.meSelected,
  }));

  const getSummoners = async (id) => {
    let summonersArray = [];
    teamMates
      .filter((t) => t.id === id)
      .forEach((t) => summonersArray.push(t.name));
    teamMates
      .filter((t) => t.id !== id)
      .forEach((t) => summonersArray.push(t.name));
    const summoners = summonersArray.join(',');
    return encodeURI(summoners);
  };

  const onMeSelected = (id) => {
    dispatch(changeMe(id));
    setModalOpen(false);
    getSummoners().then((res) => dispatch(getSummonersInfo(res)));
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
      localStorage.setItem('meSelected', meSelected)
    }
  }, [teamMates, meSelected, dispatch]);
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
