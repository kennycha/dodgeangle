import React from 'react';
import { useSelector } from 'react-redux';
import PreEnterButton from '../../components/preEnter/PreEnterButton';

const PreEnterButtonContainer = () => {
  const { teamMates } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
  }));
  return <PreEnterButton activated={Boolean(teamMates)} />;
};

export default PreEnterButtonContainer;
