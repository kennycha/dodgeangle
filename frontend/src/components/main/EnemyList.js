import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const EnemyListBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: ${2/16}rem solid ${mainTheme.mainBorder};
`;

const EnemyListItemBlock = styled.div`
  background: ${mainTheme.mainSummoner};
  border: ${2/16}rem solid ${mainTheme.mainBorder};
  margin: 0.5rem;
  height: ${100/16}rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EnemyInfoBlock = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${mainTheme.mainFontColor};
`;

const EnemyInfo = styled.div`
  margin-left: 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${mainTheme.mainFontColor};
  display: flex;
  align-items: center;
`;

const ChampionImg = styled.img`
  height: ${40/16}rem;
  width: ${40/16}rem;
  margin-right: 0.5rem;
  border-radius: 100%;
  display: block;
`;

const SummonerName = styled.div`
  display: block;
`;

/*
  AllyList의 모스트 챔피언 => EnemyList의 카운터 챔피언으로 추후에 넣으면 될듯
*/

const EnemyListItem = ({ enemy }) => {
  return (
    <EnemyListItemBlock>
      <EnemyInfoBlock>
        <EnemyInfo>
          {/* 벤한 캐릭터, 추후 삭제 => 다른 곳으로 이동할 필요성 */}
          <ChampionImg
            src={require(`../../img/${
              enemy.ban ? 'champions/' + enemy.ban.image : 'question.png'
            }`)}
          />
          {/* 선택한 position or 캐릭터 */}
          <ChampionImg
            src={require(`../../img/${
              enemy.pick ? 'champions/' + enemy.pick.image : 'question.png'
            }`)}
          />
          <SummonerName>{enemy.id}번 소환사</SummonerName>
        </EnemyInfo>
      </EnemyInfoBlock>
    </EnemyListItemBlock>
  );
};

const EnemyList = ({ enemies }) => {
  return (
    <EnemyListBlock>
      {enemies?.map((enemy) => (
        <EnemyListItem key={enemy.id} enemy={enemy} />
      ))}
    </EnemyListBlock>
  );
};

export default EnemyList;
