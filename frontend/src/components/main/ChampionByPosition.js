import React from 'react';
import styled from 'styled-components';

const ChampionByPositionBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-left: 2rem;
`;

const ChampionByPositionItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
  img {
    width: ${70/16}rem;
  }
`;

const ChampionByPosition = ({ onAllClick, onPositionClick }) => {
  return (
    <ChampionByPositionBlock>
      <ChampionByPositionItem onClick={onAllClick}>
        <img src={require('../../img/positions/all.png')} alt="all" />
      </ChampionByPositionItem>
      <ChampionByPositionItem onClick={onPositionClick}>
        <img src={require('../../img/positions/top.png')} alt="top" />
      </ChampionByPositionItem>
      <ChampionByPositionItem onClick={onPositionClick}>
        <img src={require('../../img/positions/jgl.png')} alt="jgl" />
      </ChampionByPositionItem>
      <ChampionByPositionItem onClick={onPositionClick}>
        <img src={require('../../img/positions/mid.png')} alt="mid" />
      </ChampionByPositionItem>
      <ChampionByPositionItem onClick={onPositionClick}>
        <img src={require('../../img/positions/adc.png')} alt="adc" />
      </ChampionByPositionItem>
      <ChampionByPositionItem onClick={onPositionClick}>
        <img src={require('../../img/positions/sup.png')} alt="sup" />
      </ChampionByPositionItem>
    </ChampionByPositionBlock>
  );
};

export default ChampionByPosition;
