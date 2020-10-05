import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import PositionSelector from './PositionSelector';
//npm install react-icons --save
// import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import mainTheme from '../../lib/styles/mainTheme';
import ReactPlayer from 'react-player';

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
  position: relative;
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
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: calc(100% - 2rem);
  background: ${palette.gray[1]};
  padding: 2rem;
  padding-top: 1rem;
  margin: 0.5rem 1rem;
  img {
    border-radius: ${20 / 16}rem;
    width: ${400 / 16}rem;
    height: ${280 / 16}rem;
    margin-right: 1rem;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
  div.player-container {
    border-radius: ${20 / 16}rem;
    overflow: hidden;
    width: ${500 / 16}rem;
  }
  div.split {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: calc(100% - 2rem);
    background: ${palette.gray[1]};
  }
  h3 {
    color: ${mainTheme.mainFontColor};
    margin-top: 0;
  }
`;

const MeBlock = styled.div`
  position: absolute;
  left: -70px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: ${mainTheme.mainBan};
  color: ${mainTheme.mainLogoColor};
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamListItem = ({ teamMate, dragStart, dragEnd, onPositionClick }) => {
  return (
    <TeamListItemBlock
      draggable={true}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={teamMate.id}
      className="draggable"
    >
      {teamMate.me && <MeBlock>Me</MeBlock>}
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
          <h3>
            팀원 입력을 완료한 후, 아래 영상과 같이 팀원 픽 순서와 포지션 정보를
            확정해주세요
          </h3>
          <div className="split">
            <img src={require('../../img/inputinfo.png')} alt="inputinfo" />
            <div className="player-container">
              <ReactPlayer
                url="https://res.cloudinary.com/kennycld/video/upload/v1601798334/dodgeAngle/infoVideo_rjwaqh.mp4"
                playing={true}
                loop={true}
                width="500px"
                height="280px"
              />
            </div>
          </div>
        </InfoBlock>
      )}
    </TeamListViewerBlock>
  );
};

export default TeamListViewer;
