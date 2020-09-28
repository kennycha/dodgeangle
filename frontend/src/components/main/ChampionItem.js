import React from 'react';
import styled from 'styled-components';
import UserSelectContainer from '../../containers/main/UserSelectContainer';

const ChampionItemBlock = styled.div`
  padding: ${10/16}rem;
  height: ${150/16}rem;
  width: ${150/16}rem;
  cursor: pointer;
`;

const SelectedChampionItemBlock = styled(ChampionItemBlock)`
  z-index: 10;
  position: relative;
  height: ${150/4}rem;
  width: ${150/4}rem;
`;

const ChampionItem = ({ champion, isSelected, onClick }) => {
  return isSelected ? (
    <SelectedChampionItemBlock id="con0" onClick={onClick}>
      <UserSelectContainer champion={champion} />
      <img
        src={require(`../../img/champions/${champion.image}`)}
        width="160rem"
        height="160rem"
        alt="champion1"
      />
    </SelectedChampionItemBlock>
  ) : (
    <ChampionItemBlock onClick={onClick}>
      <img
        src={require(`../../img/champions/${champion.image}`)}
        alt="champion2"
      />
    </ChampionItemBlock>
  );
};

export default ChampionItem;
