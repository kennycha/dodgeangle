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
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const PositionItemBlock = styled.div`
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PositionItem = styled.div`
  display: relative;
`;

const PositionOverlay = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 100%;
  position: absolute;
  background-color: ${palette.black};
  opacity: 0.7;
  display: none;
`;

const PositionImg = styled.img`
  height: 80px;
  width: 80px;
  margin-right: 1rem;
  border-radius: 100%;
`;

const TeamListItem = ({ teamMate, dragStart, dragEnd, onPositionClick }) => {
  return (
    <TeamListItemBlock
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={teamMate.id}
    >
      <div draggable={false}>{teamMate.id}</div>
      <div draggable={false}>{teamMate.name}</div>
      <PositionItemBlock id={teamMate.id} draggable={false}>
        <PositionItem id="top">
          <PositionOverlay className="selected" />
          <PositionImg
            src={require('../../img/positions/top.png')}
            draggable={false}
            onClick={onPositionClick}
          />
        </PositionItem>
        <PositionItem id="jgl">
          <PositionOverlay />
          <PositionImg
            src={require('../../img/positions/jgl.png')}
            draggable={false}
            onClick={onPositionClick}
          />
        </PositionItem>
        <PositionItem id="mid">
          <PositionOverlay />
          <PositionImg
            src={require('../../img/positions/mid.png')}
            draggable={false}
            onClick={onPositionClick}
          />
        </PositionItem>
        <PositionItem id="adc">
          <PositionOverlay />
          <PositionImg
            src={require('../../img/positions/adc.png')}
            draggable={false}
            onClick={onPositionClick}
          />
        </PositionItem>
        <PositionItem id="sup">
          <PositionOverlay />
          <PositionImg
            src={require('../../img/positions/sup.png')}
            draggable={false}
            onClick={onPositionClick}
          />
        </PositionItem>
      </PositionItemBlock>
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
