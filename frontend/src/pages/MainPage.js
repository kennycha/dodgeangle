import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import AllyListContainer from '../containers/main/AllyListContainer';
import ChampionPickerContainer from '../containers/main/ChampionPickerContainer';
import EnemyListContainer from '../containers/main/EnemyListContainer';

const MainBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Main | DODGEANGLE</title>
      </Helmet>
      <MainBlock>
        <AllyListContainer />
        <ChampionPickerContainer />
        <EnemyListContainer />
      </MainBlock>
    </>
  );
};

export default MainPage;
