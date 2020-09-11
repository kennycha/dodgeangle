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
  const placeholder = `아래와 같이, 입장 시 안내채팅을 복사해 입력해주세요.
 
ex) 정님이 로비에 참가하셨습니다.
    정보님이 로비에 참가하셨습니다. 
    정통님이 로비에 참가하셨습니다. 
    보통님이 로비에 참가하셨습니다. 
    정보통님이 로비에 참가하셨습니다. `;

  return (
    <InputBlock>
      <Input onChange={onInputChange} placeholder={placeholder} />
      <Button onClick={onButtonClick} fullWidth>
        입력
      </Button>
    </InputBlock>
  );
};

export default PreEnterInput;
