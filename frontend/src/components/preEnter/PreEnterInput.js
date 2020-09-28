import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import Input from '../common/Input';

const InputBlock = styled(Responsive)``;

const PreEnterInput = ({
  teamMates,
  innerTeamMates,
  onButtonClick,
  onInputChange,
  onInitClick,
}) => {
  const placeholder = `아래와 같이, 입장 시 안내채팅을 복사해 입력해주세요.
 
ex) 달려라메기님이 로비에 참가하셨습니다.
    정보통님이 로비에 참가하셨습니다. 
    죽기장인님이 로비에 참가하셨습니다. 
    끌라우드템뿔라님이 로비에 참가하셨습니다. 
    하이드온부시님이 로비에 참가하셨습니다.
 `;

  return (
    <InputBlock>
      <Input
        onChange={onInputChange}
        placeholder={placeholder}
        value={innerTeamMates}
        disabled={Boolean(teamMates)}
      />
      {teamMates ? (
        <Button onClick={onInitClick} fullWidth>
          팀원 재입력
        </Button>
      ) : (
        <Button onClick={onButtonClick} fullWidth>
          팀원 입력 완료
        </Button>
      )}
    </InputBlock>
  );
};

export default PreEnterInput;
