import React from 'react';
import styled, { css } from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const UserSelectBlock = styled.div`
  position: absolute;
  z-index: -1;
  top: -60px;
  left: -60px;
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:nth-child(2) {
      justify-content: flex-end;
    }
    &:nth-child(3) {
      justify-content: flex-start;
    }
  }
`;

const UserSelectItemBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  border-radius: 100%;
  color: ${mainTheme.mainFontColor};
  background: ${mainTheme.mainSummoner};
  font-size: 1.5rem;
  border: 3px solid ${mainTheme.mainEnemy};
  ${(props) =>
    props.ally &&
    css`
      border: 3px solid ${mainTheme.mainAlly};
    `}
`;

const UserSelectItem = ({ ally, onClick, id }) => {
  return ally ? (
    <UserSelectItemBlock ally onClick={onClick} id={id}>{`${
      parseInt(id[1]) + 1
    }픽`}</UserSelectItemBlock>
  ) : (
    <UserSelectItemBlock onClick={onClick} id={id}>{`${
      parseInt(id[1]) + 1
    }픽`}</UserSelectItemBlock>
  );
};

const UserSelect = ({ onClick }) => {
  return (
    <UserSelectBlock>
      <div>
        <UserSelectItem onClick={onClick} ally id="A0" />
        <UserSelectItem onClick={onClick} ally id="A1" />
        <UserSelectItem onClick={onClick} ally id="A2" />
        <UserSelectItem onClick={onClick} ally id="A3" />
      </div>
      <div>
        <UserSelectItem onClick={onClick} ally id="A4" />
      </div>
      <div>
        <UserSelectItem onClick={onClick} id="E0" />
      </div>
      <div>
        <UserSelectItem onClick={onClick} id="E1" />
        <UserSelectItem onClick={onClick} id="E2" />
        <UserSelectItem onClick={onClick} id="E3" />
        <UserSelectItem onClick={onClick} id="E4" />
      </div>
    </UserSelectBlock>
  );
};

export default UserSelect;
