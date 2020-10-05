import React from 'react';
import styled from 'styled-components';
import dotenv from 'dotenv';
import UserSelectContainer from '../../containers/main/UserSelectContainer';

dotenv.config();
const URL = process.env.REACT_APP_API_URL;

const ChampionItemBlock = styled.div`
  height: ${100 / 16}rem;
  width: ${100 / 16}rem;
  cursor: pointer;
  img {
    height: ${100 / 16}rem;
    width: ${100 / 16}rem;
  }
`;

const SelectedChampionItemBlock = styled(ChampionItemBlock)`
  z-index: 10;
  position: relative;
  height: ${120 / 4}rem;
  width: ${120 / 4}rem;
  img {
    height: ${120 / 16}rem;
    width: ${120 / 16}rem;
  }
`;

const ChampionItem = ({ champion, isSelected, onClick }) => {
  return isSelected ? (
    <SelectedChampionItemBlock id="con0" onClick={onClick}>
      <UserSelectContainer champion={champion} />
      <img src={`${URL}/media/champion/${champion.image}`} alt="champion1" />
    </SelectedChampionItemBlock>
  ) : (
    <ChampionItemBlock onClick={onClick}>
      <img src={`${URL}/media/champion/${champion.image}`} alt="champion2" />
    </ChampionItemBlock>
  );
};

export default ChampionItem;
