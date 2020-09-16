import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import PositionSelector from './PositionSelector';

const TeamListViewerBlock = styled(Responsive)`
  background: ${palette.violet[3]};
`;

const TeamListItemBlock = styled.div`
  background: ${palette.indigo[5]};
  margin: 0.5rem;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const TeamMateInfo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const TeamListItem = ({ teamMate, dragStart, dragEnd, onPositionClick }) => {
  return (
    <TeamListItemBlock
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={teamMate.id}
    >
      <TeamMateInfo draggable={false}>
        {parseInt(teamMate.id) + 1}픽
      </TeamMateInfo>
      <TeamMateInfo draggable={false}>{teamMate.name}</TeamMateInfo>
      <PositionSelector teamMate={teamMate} onPositionClick={onPositionClick} />
    </TeamListItemBlock>
  );
};

const TeamListViewer = ({
  teamMates,
  error,
  dragStart,
  dragEnd,
  dragOver,
  onPositionClick,
}) => {
  return (
    <TeamListViewerBlock onDragOver={dragOver} draggable={false}>
      <h1>Team Mates List</h1>
      {teamMates?.map((teamMate) => (
        <TeamListItem
          key={teamMate.id}
          teamMate={teamMate}
          dragStart={dragStart}
          dragEnd={dragEnd}
          onPositionClick={onPositionClick}
        />
      ))}
    </TeamListViewerBlock>
  );
};

export default TeamListViewer;
