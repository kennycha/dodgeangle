import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';
import Responsive from '../common/Responsive';

const PreEnterTitleBlock = styled(Responsive)`
  color: ${mainTheme.mainLogoColor};
  font-size: 3.5rem;
  font-weight: 700;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
  img {
    width: 50px;
    margin: 1rem;
    margin-top: 1.3rem;
  }
`;

const PreEnterTitle = () => {
  return (
    <PreEnterTitleBlock draggable={false}>
      DODGE
      <img src={require('../../img/logo.png')} alt="logo" />
      ANGLE
    </PreEnterTitleBlock>
  );
};

export default PreEnterTitle;
