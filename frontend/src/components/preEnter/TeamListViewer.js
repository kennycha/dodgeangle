import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import PositionSelector from './PositionSelector';
//npm install react-icons --save
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

const TeamListViewerBlock = styled(Responsive)`
  user-select: none;
  padding: 0;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const TeamListItemBlock = styled.div`
  background: ${palette.indigo[5]};
  margin: 0.5rem;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TeamMateInfo = styled.div`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const InfoBlock = styled.div`
  display: flex;
  justify-content: space-around;
  width: calc(100% - 2rem);
  background: ${palette.gray[1]};
  padding: 2rem;
  margin: 0.5rem 1rem;
  img {
    border-radius: ${20 / 16}rem;
    width: ${450 / 16}rem;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    & + & {
      margin: 5rem;
    }
  }
`;

const TeamListItem = ({
  teamMate,
  dragStart,
  dragEnd,
  onPositionClick,
  onMeChange,
}) => {
  return (
    <TeamListItemBlock
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={teamMate.id}
      className="draggable"
    >
      <TeamMateInfo draggable={false}>
        {teamMate.me ? (
          <FaRegCheckCircle onClick={() => onMeChange(teamMate.id)} />
        ) : (
          <FaRegCircle onClick={() => onMeChange(teamMate.id)} />
        )}
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
      {teamMates ? (
        teamMates.map((teamMate) => (
          <TeamListItem
            key={teamMate.id}
            teamMate={teamMate}
            onMeChange={onMeChange}
            dragStart={dragStart}
            dragEnd={dragEnd}
            onPositionClick={onPositionClick}
          />
        ))
      ) : (
        <InfoBlock>
          <img src={require('../../img/inputinfo.png')} alt="inputinfo" />
          <img src={require('../../img/inputinfo.png')} alt="inputinfo" />
        </InfoBlock>
      )}
    </TeamListViewerBlock>
  );
};

export default TeamListViewer;
