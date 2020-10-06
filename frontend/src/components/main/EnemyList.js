import React from 'react';
import styled, { css } from 'styled-components';
import dotenv from 'dotenv';
import mainTheme from '../../lib/styles/mainTheme';

dotenv.config();
const URL = process.env.REACT_APP_API_URL;

const EnemyListBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
`;

const LabelBlock = styled.div`
  height: 2rem;
  padding: 0 1.5rem 0 1rem;
  margin: 1rem 0 0.5rem 0;
  background: ${mainTheme.mainBackground};
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Label = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  background: ${mainTheme.mainBackground};
  color: ${mainTheme.mainEnemy};
  ${(props) =>
    props.white &&
    css`
      font-size: 1rem;
      color: ${mainTheme.mainLogoColor};
    `}
`;

const EnemyListItemBlock = styled.div`
  background: ${mainTheme.mainSummoner};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
  margin: 0.5rem;
  height: ${100 / 16}rem;
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
  height: ${40 / 16}rem;
  width: ${40 / 16}rem;
  margin-right: 0.5rem;
  border-radius: 100%;
  display: block;
`;

const SummonerName = styled.div`
  display: block;
`;

const CounterOrExpetedChampionsBlock = styled.div`
  color: ${mainTheme.mainFontColor};
  display: flex;
  margin: 0.5rem;
`;

const CounterOrExpetedChampion = styled.div`
  color: ${mainTheme.mainFontColor};
  margin: 0.25rem;
  align-items: center;
`;

const ChampionMiniImg = styled.img`
  height: 2rem;
  width: 2rem;
  display: block;
  border-radius: 100%;
`;

const ChampionWinRate = styled.div`
  font-size: 1.25rem;
  text-align: center;
`;

const BanListBlock = styled.div`
  margin: 1rem 1rem 0 17rem;
  background: ${mainTheme.mainBackground};
  display: flex;
`

const BanImg = styled.img`
  background: ${mainTheme.mainSummoner};
  display: block;
  height: 3rem;
  width: 3rem;
  margin-left: 1rem;
  padding: 0.1rem;
  ${props =>
    props.ban &&
    css`
      padding: 0.25rem;
    `
  }
`;

const BanList = ({ enemies, phase }) => {
  return (
    <BanListBlock>
      {enemies && enemies.map(enemy => (
          <BanImg
            key={enemy.name}
            src={
              enemy.ban && phase === "pick"
                ? `${URL}/media/champion/${enemy.ban.image}`
                : require('../../img/noban.png')
              }
            ban={!enemy.ban || phase === "ban"}
          />
      ))}
    </BanListBlock>
  )
}

/*
  AllyList의 모스트 챔피언 => EnemyList의 카운터 챔피언으로 추후에 넣으면 될듯
*/
const EnemyListLabel = () => {
  return (
    <LabelBlock>
      <Label white>카운터 챔피언</Label>
      <Label>적군 팀</Label>
    </LabelBlock>
  );
};

const EnemyListItem = ({ enemy, phase }) => {
  return (
    <EnemyListItemBlock>
      <EnemyInfoBlock>
        <CounterOrExpetedChampionsBlock>
          {enemy.counterChampions !== null
            ? enemy.counterChampions.map((champion) => (
                <CounterOrExpetedChampion
                  key={enemy.counterChampions.indexOf(champion)}
                >
                  <ChampionMiniImg
                    src={`${URL}/media/champion/${champion.image}`}
                  />
                  <ChampionWinRate>{champion.winRate}</ChampionWinRate>
                </CounterOrExpetedChampion>
              ))
            : enemy.expectedChampions !== null &&
              enemy.expectedChampions.map((champion) => (
                <CounterOrExpetedChampion
                  key={enemy.expectedChampions.indexOf(champion)}
                >
                  <ChampionMiniImg
                    src={`${URL}/media/champion/${champion.image}`}
                  />
                  <ChampionWinRate>{champion.winRate}</ChampionWinRate>
                </CounterOrExpetedChampion>
              ))}
        </CounterOrExpetedChampionsBlock>
      </EnemyInfoBlock>
      <EnemyInfoBlock>
        <EnemyInfo>
          {/* 순서 => AllyList와 대칭을 위해 반대로 */}

          <SummonerName>{enemy.id + 1}번 소환사</SummonerName>

          {/* 선택한 position or 캐릭터 */}
          <ChampionImg
            src={
              enemy.pick
                ? `${URL}/media/champion/${enemy.pick.image}`
                : require('../../img/question.png')
            }
            alt="pick"
          />

          {/* 벤한 캐릭터, 추후 삭제 => 다른 곳으로 이동할 필요성 */}
          {phase === "ban" &&
            <ChampionImg
              src={
                enemy.ban
                  ? `${URL}/media/champion/${enemy.ban.image}`
                  : require('../../img/nochampion.png')
              }
              alt="ban"
            />
          }
        </EnemyInfo>
      </EnemyInfoBlock>
    </EnemyListItemBlock>
  );
};

const EnemyList = ({ enemies, phase }) => {
  return (
    <EnemyListBlock>
      <BanList enemies={enemies} phase={phase} />
      <EnemyListLabel />
      {enemies?.map((enemy) => (
        <EnemyListItem key={enemy.id} enemy={enemy} phase={phase} />
      ))}
    </EnemyListBlock>
  );
};

export default EnemyList;
