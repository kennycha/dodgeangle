import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';

const PreEnterTitleBlock = styled(Responsive)`
  font-size: 2rem;
  font-weight: 700;
`;

const PreEnterTitle = () => {
  return <PreEnterTitleBlock>입장 전 페이지</PreEnterTitleBlock>;
};

export default PreEnterTitle;
