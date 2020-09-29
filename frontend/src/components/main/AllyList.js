import React from 'react';
import styled, { css } from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';


const AllyListBlock = styled.div`
height: 100%;
background: ${mainTheme.mainBackground};
border: ${2/16}rem solid ${mainTheme.mainBorder};
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
  color: ${mainTheme.mainAlly};
  ${props=> props.white && css`font-size: 1rem; color: ${mainTheme.mainLogoColor}`}
`;

const AllyListItemBlock = styled.div`
  background: ${mainTheme.mainSummoner};
  border: ${2/16}rem solid ${mainTheme.mainBorder};
  margin: 0.5rem;
  height: ${100/16}rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AllyInfoBlock = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${mainTheme.mainFontColor};
`;

const AllyInfo = styled.div`
  margin-left: 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: ${mainTheme.mainFontColor};
  display: flex;
  align-items: center;
`;

const ChampionImg = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.5rem;
  border-radius: 100%;
  display: block;
`;

const SummonerName = styled.div`
  display: block;
`;

const MostChampionsBlock = styled.div`
  color: ${mainTheme.mainFontColor};
  display: flex;
  margin: 0.5rem;
`;

const MostChampion = styled.div`
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
`;
const AllyListLabel = () => {
  return (
    <LabelBlock>
      <Label >아군 팀</Label>
      <Label white>모스트 챔피언</Label>
    </LabelBlock>
  )
}

const AllyListItem = ({ teamMate }) => {
  return (
    <AllyListItemBlock>
      <AllyInfoBlock>
        <AllyInfo>
          {/* 벤한 캐릭터, 추후 삭제 => 다른 곳으로 이동할 필요성 */}
          <ChampionImg
            src={require(`../../img/${
              teamMate.ban ? 'champions/' + teamMate.ban.image : 'nochampion.png'
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
          <SummonerName>{teamMate?.name}</SummonerName>
        </AllyInfo>
      </AllyInfoBlock>
      <AllyInfoBlock>
        <MostChampionsBlock>
          {teamMate?.mostChampions && teamMate?.mostChampions?.map((champion) => (
            <MostChampion key={teamMate.mostChampions.indexOf(champion)}>
              <ChampionMiniImg 
                src={require(`../../img/champions/${champion.image}`)}
              />
              <ChampionWinRate>{champion.winRate}</ChampionWinRate>
            </MostChampion>
          ))}
        </MostChampionsBlock>
      </AllyInfoBlock>
    </AllyListItemBlock>
  );
};

const AllyList = ({ teamMates }) => {
  return (
    <AllyListBlock>
      <AllyListLabel />
      {teamMates?.map((teamMate) => (
        <AllyListItem key={teamMate.id} teamMate={teamMate} />
      ))}
    </AllyListBlock>
  );
};

export default AllyList;