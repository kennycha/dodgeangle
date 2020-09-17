import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import PositionSelector from './PositionSelector';
//npm install react-icons --save
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";


const TeamListViewerBlock = styled(Responsive)`
  background: ${palette.violet[3]};
`;

const TeamListItemBlock = styled.div`
  background: ${palette.indigo[5]};
  margin: 0.5rem;
  height: 100px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  cursor: pointer;
`;

const TeamMateInfo = styled.div`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const TeamListItem = ({ teamMate, dragStart, dragEnd, onPositionClick, onMeChange }) => {
  return (
    <TeamListItemBlock
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={teamMate.id}
    >
      {teamMate.me ?
        <FaRegCheckCircle onClick={()=>onMeChange(teamMate.id)} /> :
        <FaRegCircle onClick={()=>onMeChange(teamMate.id)}/>
      }
      <TeamMateInfo draggable={false}>
        {parseInt(teamMate.id) + 1}픽 {teamMate.name}
      </TeamMateInfo>
      <PositionSelector teamMate={teamMate} onPositionClick={onPositionClick} />
    </TeamListItemBlock>
  );
};

const TeamListViewer = ({
  teamMates,
  error,
  onMeChange,
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
          onMeChange={onMeChange}
          dragStart={dragStart}
          dragEnd={dragEnd}
          onPositionClick={onPositionClick}
        />
      ))}
    </TeamListViewerBlock>
  );
};

export default TeamListViewer;
