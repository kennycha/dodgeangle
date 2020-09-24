import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const EnemyListBlock = styled.div`
  height: 100%;
  background: ${palette.indigo[3]};
`;

const EnemyListItemBlock = styled.div`
  background: ${palette.indigo[5]};
  margin: 0.5rem;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const EnemyInfo = styled.div`
  margin-left: 1.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const ChampionImg = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 1rem;
  border-radius: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const EnemyListItem = ({ enemy }) => {
  return (
    <EnemyListItemBlock>
      <EnemyInfo>
        {/* 벤한 캐릭터, 추후 삭제 => 다른 곳으로 이동할 필요성 */}
        <ChampionImg
          src={require(`../../img/${
            enemy.ban ? 'champions/' + enemy.ban.image : 'question.png'
          }`)}
        />
        {/* 선택한 position or 캐릭터 */}
        <ChampionImg
          src={require(`../../img/${
            enemy.pick ? 'champions/' + enemy.pick.image : 'question.png'
          }`)}
        />
      </EnemyInfo>
    </EnemyListItemBlock>
  );
};

const EnemyList = ({ enemies }) => {
  return (
    <EnemyListBlock>
      {enemies?.map((enemy) => (
        <EnemyListItem key={enemy.id} enemy={enemy} />
      ))}
    </EnemyListBlock>
  );
};

export default EnemyList;
