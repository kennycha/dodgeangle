import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

const TeamListViewerBlock = styled(Responsive)`
  background: ${palette.violet[3]};
`;

const TeamListItem = styled.div`
  background: ${palette.indigo[3]};
`;

const TeamListViewer = ({ teamMates, error }) => {
  return (
    <TeamListViewerBlock>
      <h1>Team Mates List</h1>
      {teamMates?.map((teamMate) => (
        <TeamListItem key={teamMates.indexOf(teamMate)}>
          {teamMate}
        </TeamListItem>
      ))}
    </TeamListViewerBlock>
  );
};

export default TeamListViewer;
