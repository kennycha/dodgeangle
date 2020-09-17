import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

const TeamListViewerBlock = styled(Responsive)`
  background: ${palette.violet[3]};
`;

const TeamListItemBlock = styled.div`
  background: ${palette.indigo[5]};
  margin: 0.5rem;
  height: 50px;
  cursor: pointer;
`;

const TeamListItem = ({ teamMate, onSelectChange, dragStart, dragEnd }) => {
  return (
    <TeamListItemBlock
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={teamMate.id}
    >
      {teamMate.id}
      {teamMate.name}
      {teamMate.pos}
      <select onChange={onSelectChange} id={teamMate.id}>
        <option value="top">탑</option>
        <option value="jgl">정글</option>
        <option value="mid">미드</option>
        <option value="adc">원딜</option>
        <option value="sup">서폿</option>
      </select>
    </TeamListItemBlock>
  );
};

const TeamListViewer = ({
  teamMates,
  error,
  onSelectChange,
  dragStart,
  dragEnd,
  dragOver,
}) => {
  return (
    <TeamListViewerBlock onDragOver={dragOver}>
      <h1>Team Mates List</h1>
      {teamMates?.map((teamMate) => (
        <TeamListItem
          key={teamMate.id}
          teamMate={teamMate}
          onSelectChange={onSelectChange}
          dragStart={dragStart}
          dragEnd={dragEnd}
        />
      ))}
    </TeamListViewerBlock>
  );
};

export default TeamListViewer;
