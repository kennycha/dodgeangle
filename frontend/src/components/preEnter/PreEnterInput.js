import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';

const InputBlock = styled(Responsive)`
  background: ${palette.yellow[3]};
`;

const Input = styled.input``;

const PreEnterInput = () => {
  return (
    <InputBlock>
      <Input />
    </InputBlock>
  );
};

export default PreEnterInput;
