import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import PositionSelector from './PositionSelector';
//npm install react-icons --save
// import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import mainTheme from '../../lib/styles/mainTheme';

const TeamListViewerBlock = styled(Responsive)`
  user-select: none;
  padding: 0 0.5rem;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const TeamListItemBlock = styled.div`
  background: ${mainTheme.mainLogoColor};
  /* border: 1px solid ${mainTheme.mainBorder}; */
  border-radius: ${10 / 16}rem;
  margin: 0.5rem;
  margin-bottom: 1rem;
  &:last-child {
    margin-bottom: 0.5rem;
  }
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const TeamMateInfo = styled.div`
  margin-left: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  height: 100%;
  display: flex;
  align-items: center;
  span.teamMate-order {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${mainTheme.mainSummoner};
    padding: 0.8rem;
    border-radius: 2rem;
    color: ${mainTheme.mainLogoColor};
    font-size: 1rem;
    margin-right: 1rem;
    height: 3rem;
    width: 4rem;
  }
  span.teamMate-name {
    height: 100%;
    display: flex;
    align-items: center;
    color: ${mainTheme.mainFontColor};
  }
  img {
  }
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
        <span className="teamMate-order">{parseInt(teamMate.id) + 1}픽</span>
        <span className="teamMate-name">{teamMate.name}</span>
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
