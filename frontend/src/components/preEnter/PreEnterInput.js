import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import Input from '../common/Input';

const InputBlock = styled(Responsive)`
  background: ${palette.yellow[3]};
`;

const PreEnterInput = ({ teamMates, setTeamMates, onButtonClick }) => {
  const onInputChange = (e) => {
    setTeamMates(e.target.value);
  };

  return (
    <InputBlock>
      <Input onChange={onInputChange} />
      <Button onClick={onButtonClick} fullWidth>
        입력
      </Button>
    </InputBlock>
  );
};

export default PreEnterInput;
