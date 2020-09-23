import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const AllyListBlock = styled.div`
  height: 100%;
  background: ${palette.orange[3]};
`;

const AllyListItemBlock = styled.div`
  background: ${palette.indigo[5]};
  margin: 0.5rem;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AllyInfo = styled.div`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const ChampionImg = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 1rem;
  border-radius: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const AllyListItem = ({
  teamMate
}) => {
  console.log("팀메이트 확인", teamMate)
  return (
    <AllyListItemBlock>
      <AllyInfo>
        <ChampionImg
          src={require(`../../img/champions/${teamMate?.name}.png`)}
          // src={require(`../../img/positions/${teamMate?.pos}.png`)}
        />
        소환사명: {teamMate?.name}
        {/* &챔피언&포지션&승률&최근게임&챔피언성적 */}
      </AllyInfo>
    </AllyListItemBlock>
  )
}

const AllyList = ({
  teamMates,
}) => {
  return (
    <AllyListBlock>
      {teamMates?.map((teamMate) => (
        <AllyListItem
          key={teamMate.id}
          teamMate={teamMate}
        />
      ))}
    </AllyListBlock>
  );
};

export default AllyList;
