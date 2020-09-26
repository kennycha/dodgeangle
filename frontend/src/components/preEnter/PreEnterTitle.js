import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
import Responsive from '../common/Responsive';

const PreEnterTitleBlock = styled(Responsive)`
  color: ${mainTheme.mainLogoColor};
  font-size: 2.5rem;
  font-weight: 700;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
`;

const PreEnterTitle = () => {
  return (
    <PreEnterTitleBlock draggable={false}>닷지각 DodgeAngle</PreEnterTitleBlock>
  );
};

export default PreEnterTitle;
