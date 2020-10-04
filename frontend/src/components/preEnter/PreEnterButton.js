import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import { Link } from 'react-router-dom';
import mainTheme from '../../lib/styles/mainTheme';

const PreEnterButtonBlock = styled(Responsive)``;

const SelectMeModal = styled.div`
  background: ${mainTheme.mainPick};
  position: fixed;
  top: 30%;
  left: calc(50% - ${300 / 16}rem);
  padding: 2rem;
  padding-bottom: 1rem;
  width: ${600 / 16}rem;
  border-radius: 20px;
  div.modalLabel {
    font-size: 1.5rem;
    color: ${mainTheme.mainLogoColor};
    text-align: center;
  }
`;

const SelectList = styled.div`
  margin-top: 2rem;
`;

const SelectItem = styled.div`
  background: ${mainTheme.mainLogoColor};
  margin-bottom: 1rem;
  color: ${mainTheme.mainFontColor};
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.5rem;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 1rem;
  }
`;

const PreEnterButton = ({
  activated,
  completed,
  onMeSelected,
  modalOpen,
  setModalOpen,
  teamMates,
}) => {
  return (
    <PreEnterButtonBlock>
      {modalOpen && (
        <SelectMeModal>
          <div className="modalLabel">본인 계정을 클릭해 주세요</div>
          <SelectList>
            {teamMates.map((teamMate) => (
              <SelectItem
                key={teamMate.id}
                onClick={() => onMeSelected(teamMate.id)}
              >
                {teamMate.name}
              </SelectItem>
            ))}
          </SelectList>
          <Button onClick={() => setModalOpen(false)} fullWidth>
            닫기
          </Button>
        </SelectMeModal>
      )}
      {completed ? (
        <Link to="/main">
          <Button fullWidth>밴픽화면으로 이동</Button>
        </Link>
      ) : (
        activated && (
          <Button onClick={() => setModalOpen(true)} fullWidth red>
            팀원 배치 완료
          </Button>
        )
      )}
    </PreEnterButtonBlock>
  );
};

export default PreEnterButton;
