import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const EnemyListBlock = styled.div`
  height: 100%;
  background: ${palette.indigo[3]};
`;

const EnemyList = () => {
  return <EnemyListBlock>EnemyList</EnemyListBlock>;
};

export default EnemyList;
