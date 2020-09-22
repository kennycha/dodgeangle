import React, { useState } from 'react';
import PreEnterInput from '../../components/preEnter/PreEnterInput';
import { useDispatch } from 'react-redux';
import { confirmTeamMates } from '../../modules/teamMates';

const PreEnterInputContainer = () => {
  const [teamMates, setTeamMates] = useState(``);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    if (teamMates.length !== 0) {
      const parsedTeamMates = teamMates
        .split('\n')
        .map((t) => t.trim().slice(0, -15))
        .slice(0, 5);
      const teamMatesArray = parsedTeamMates.map((teamMate) => ({
        id: parsedTeamMates.indexOf(teamMate),
        name: teamMate,
        pos: 'top',
        me: false,
        ban: null,
        pick: null,
      }));
      dispatch(confirmTeamMates(teamMatesArray));
    }
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
