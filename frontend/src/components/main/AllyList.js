import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const AllyListBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: 2px solid ${mainTheme.mainBorder};
`;

const AllyListItemBlock = styled.div`
  background: ${mainTheme.mainSummoner};
  border: 2px solid ${mainTheme.mainBorder};
  margin: 0.5rem;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AllyInfo = styled.div`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${mainTheme.mainFontColor};
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

const AllyListItem = ({ teamMate }) => {
  return (
    <AllyListItemBlock>
      <AllyInfo>
        {/* 벤한 캐릭터, 추후 삭제 => 다른 곳으로 이동할 필요성 */}
        <ChampionImg
          src={require(`../../img/${
            teamMate.ban ? 'champions/' + teamMate.ban.image : 'question.png'
          }`)}
        />
        {/* 선택한 position or 캐릭터 */}
        <ChampionImg
          src={require(`../../img/${
            teamMate.pick
              ? 'champions/' + teamMate.pick.image
              : 'positions/' + teamMate.pos + '.png'
          }`)}
        />
        {teamMate?.name}
      </AllyInfo>
    </AllyListItemBlock>
  );
};

const AllyList = ({ teamMates }) => {
  return (
    <AllyListBlock>
      {teamMates?.map((teamMate) => (
        <AllyListItem key={teamMate.id} teamMate={teamMate} />
      ))}
    </AllyListBlock>
  );
};

export default AllyList;
