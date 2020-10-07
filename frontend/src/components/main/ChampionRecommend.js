import React from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';
import mainTheme from '../../lib/styles/mainTheme';
import BarChart from '../common/BarChart';
import GaugeChart from '../common/GaugeChart';

dotenv.config();
const URL = process.env.REACT_APP_API_URL;

const ChampionRecommendBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainBackground};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const RecommendList = styled.div`
  background: ${mainTheme.mainSummoner};
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  h3 {
    text-align: center;
    color: ${mainTheme.mainFontColor};
    font-weight: bolder;
    margin-bottom: 0;
  }
  div.with-padding {
    padding-left: 7rem;
    padding-right: 7rem;
  }
`;

const RecommendItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: ${mainTheme.mainFontColor};
  font-weight: bolder;
  img {
    margin-top: 0.5rem;
    width: 6rem;
    height: 6rem;
  }
  div {
    margin-top: 0;
  }
`;

const IndexList = styled.div`
  background: ${mainTheme.mainSummoner};
  padding: 1rem;
  gap: 1rem;
  border-radius: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
    color: ${mainTheme.mainFontColor};
    font-weight: bolder;
  }
  div.flex-div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    h3 {
      margin: 0;
      padding: 0;
    }
  }
`;

const FlexBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  div.flex-col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  h3 {
    width: 100%;
    margin: 0;
  }
`;

const ChampionRecommend = ({ me, allchampion, dodgeAngle }) => {
  return (
    <ChampionRecommendBlock>
      <RecommendList>
        <h3>최근 게임 데이터에 기반한 추천 챔피언</h3>
        <FlexBox className="with-padding">
          {me.recommendChamp && allchampion ? (
            me.recommendChamp.map((id) => (
              <RecommendItem key={id}>
                <div>
                  {allchampion.find((champion) => champion.id === id).name}
                </div>
                <img
                  src={`${URL}/media/champion/${
                    allchampion.find((champion) => champion.id === id).image
                  }`}
                  alt="recommend"
                />
              </RecommendItem>
            ))
          ) : (
            <h3>정보를 불러오는 중입니다.</h3>
          )}
        </FlexBox>
      </RecommendList>
      <IndexList>
        {dodgeAngle ? (
          <>
            <div className="flex-div">
              <h3>예상 승률</h3>
              <h3>닷지각</h3>
            </div>
            <FlexBox>
              <BarChart
                allyRate={dodgeAngle.allyRate}
                enemyRate={dodgeAngle.enemyRate}
              />
              <GaugeChart dodgeAngle={dodgeAngle.dodgeAngle} />
            </FlexBox>
          </>
        ) : (
          <FlexBox>
            <h3>챔피언 픽에 따라 변동합니다</h3>
          </FlexBox>
        )}
      </IndexList>
    </ChampionRecommendBlock>
  );
};

export default ChampionRecommend;
