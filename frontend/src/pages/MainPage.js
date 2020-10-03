import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import NavbarContainer from '../containers/common/NavbarContainer';
import AllyAnalysisContainer from '../containers/main/AllyAnalysisContainer';
import AllyListContainer from '../containers/main/AllyListContainer';
import ChampionPickerContainer from '../containers/main/ChampionPickerContainer';
import ChampionRecommendContainer from '../containers/main/ChampionRecommendContainer';
import EnemyAnalysisContainer from '../containers/main/EnemyAnalysisContainer';
import EnemyListContainer from '../containers/main/EnemyListContainer';

const MainBlock = styled.div`
  height: 651px;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  width: 1920px;
  margin: 0 auto;
`;

const Spliter = styled.div`
  display: grid;
  grid-template-rows: 3fr 2fr;
  &:first-child,
  &:last-child {
    grid-template-rows: 1fr 1fr;
  }
`;

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Main | DODGEANGLE</title>
      </Helmet>
      <NavbarContainer />
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
