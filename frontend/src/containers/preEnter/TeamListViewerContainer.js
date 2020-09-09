import React from 'react';
import TeamListViewer from '../../components/preEnter/TeamListViewer';
import { useSelector } from 'react-redux';

const TeamListViewerContainer = () => {
  const { teamMates, error } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    error: teamMates.error,
  }));
  return <TeamListViewer teamMates={teamMates} error={error} />;
};

export default TeamListViewerContainer;
