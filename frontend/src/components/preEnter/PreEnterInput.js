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
 
ex) planbe님이 로비에 참가하셨습니다.
    차쿼드님이 로비에 참가하셨습니다. 
    화안내고싶은사람님이 로비에 참가하셨습니다. 
    우빈콩주님이 로비에 참가하셨습니다. 
    신수요정님이 로비에 참가하셨습니다.
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
        <Button onClick={onInitClick} fullWidth red>
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
