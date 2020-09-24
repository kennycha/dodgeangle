import React from 'react';
import styled from 'styled-components';
import UserSelectContainer from '../../containers/main/UserSelectContainer';
import palette from '../../lib/styles/palette';

const ChampionItemBlock = styled.div`
  padding: 10px;
  height: 150px;
  width: 150px;
  cursor: pointer;
  background: ${palette.pink[3]};
`;

const SelectedChampionItemBlock = styled(ChampionItemBlock)`
  z-index: 10;
  position: relative;
  height: 150px;
  width: 150px;
  background: ${palette.pink[5]};
`;

const ChampionItem = ({ champion, isSelected, onClick }) => {
  return isSelected ? (
    <SelectedChampionItemBlock onClick={onClick}>
      <UserSelectContainer champion={champion} />
      <img
        src={require(`../../img/champions/${champion.image}`)}
        width="160px"
        height="160px"
        alt="champion"
      />
    </SelectedChampionItemBlock>
  ) : (
    <ChampionItemBlock onClick={onClick}>
      <img
        src={require(`../../img/champions/${champion.image}`)}
        alt="champion"
      />
    </ChampionItemBlock>
  );
};

export default ChampionItem;
