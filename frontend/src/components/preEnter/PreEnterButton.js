import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';

const PreEnterButtonBlock = styled(Responsive)``;

const PreEnterButton = () => {
  return (
    <PreEnterButtonBlock>
      <Link to="/main">
        <Button fullWidth>메인화면으로 이동</Button>
      </Link>
    </PreEnterButtonBlock>
  );
};

export default PreEnterButton;
