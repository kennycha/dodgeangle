import React, { useState } from 'react';
import PreEnterInput from '../../components/preEnter/PreEnterInput';
import { useDispatch } from 'react-redux';
import { confirmTeamMates } from '../../modules/teamMates';

const PreEnterInputContainer = () => {
  const [teamMates, setTeamMates] = useState(``);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    // textarea로 변경 후 아래로 분리자 바꿔야 함
    // const inputTeamMates = teamMates.split('\n');

    const parsedTeamMates = teamMates
      .split('AAA')
      .map((t) => t.trim().slice(0, -15))
      .slice(0, 5);
    dispatch(confirmTeamMates(parsedTeamMates));
  };

  return (
    <PreEnterInput
      teamMates={teamMates}
      setTeamMates={setTeamMates}
      onButtonClick={onButtonClick}
    />
  );
};

export default PreEnterInputContainer;
