import React from 'react';
import TeamListViewer from '../../components/preEnter/TeamListViewer';
import { useSelector, useDispatch } from 'react-redux';
import { changePosition } from '../../modules/teamMates';

const TeamListViewerContainer = () => {
  const dispatch = useDispatch();

  const { teamMates, error } = useSelector(({ teamMates }) => ({
    teamMates: teamMates.teamMates,
    error: teamMates.error,
  }));
  const onSelectChange = (e) => {
    dispatch(
      changePosition({ id: parseInt(e.target.id), pos: e.target.value }),
    );
  };

  return (
    <TeamListViewer
      teamMates={teamMates}
      error={error}
      onSelectChange={onSelectChange}
    />
  );
};

export default TeamListViewerContainer;
