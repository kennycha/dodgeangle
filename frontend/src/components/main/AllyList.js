import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const AllyListBlock = styled.div`
  height: 100vh;
  background: ${palette.orange[3]};
`;

const AllyList = () => {
  return <AllyListBlock>AllyList</AllyListBlock>;
};

export default AllyList;
