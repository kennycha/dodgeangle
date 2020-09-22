import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import AllyAnalysisContainer from '../containers/main/AllyAnalysisContainer';
import AllyListContainer from '../containers/main/AllyListContainer';
import ChampionPickerContainer from '../containers/main/ChampionPickerContainer';
import ChampionRecommendContainer from '../containers/main/ChampionRecommendContainer';
import EnemyAnalysisContainer from '../containers/main/EnemyAnalysisContainer';
import EnemyListContainer from '../containers/main/EnemyListContainer';

const MainBlock = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

const Spliter = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  &:first-child,
  &:last-child {
    grid-template-rows: 3fr 1fr;
  }
`;

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Main | DODGEANGLE</title>
      </Helmet>
      <MainBlock>
        <Spliter>
          <AllyListContainer />
          <AllyAnalysisContainer />
        </Spliter>
        <Spliter>
          <ChampionPickerContainer />
          <ChampionRecommendContainer />
        </Spliter>
        <Spliter>
          <EnemyListContainer />
          <EnemyAnalysisContainer />
        </Spliter>
      </MainBlock>
    </>
  );
};

export default MainPage;
