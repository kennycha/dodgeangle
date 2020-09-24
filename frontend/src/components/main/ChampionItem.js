import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ChampionItemBlock = styled.div`
  height: 150px;
  width: 150px;
  cursor: pointer;
  background: ${palette.pink[3]};
`;

const SelectedChampionItemBlock = styled(ChampionItemBlock)`
  z-index: 10;
  height: 180px;
  width: 180px;
  background: ${palette.pink[5]};
`;

const ChampionItem = ({ champion, isSelected, onClick }) => {
  return isSelected ? (
    <SelectedChampionItemBlock onClick={onClick}>
      <img
        src={require(`../../img/champions/${champion.image}`)}
        width="200px"
        height="200px"
        alt="champion"
      />
      <div>{champion.name}</div>
    </SelectedChampionItemBlock>
  ) : (
    <ChampionItemBlock onClick={onClick}>
      <img
        src={require(`../../img/champions/${champion.image}`)}
        alt="champion"
      />
      <div>{champion.name}</div>
    </ChampionItemBlock>
  );
};

export default ChampionItem;
