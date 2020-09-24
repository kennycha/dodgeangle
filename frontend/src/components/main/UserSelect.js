import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const UserSelectBlock = styled.div`
  position: absolute;
  z-index: -1;
  top: -60px;
  left: -60px;
  width: 300px;
  height: 300px;
  background: ${palette.lime[3]};
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
  background: ${palette.red[5]};
  ${(props) =>
    props.ally &&
    css`
      background: ${palette.blue[5]};
    `}
`;

const UserSelectItem = ({ ally, onClick, id }) => {
  return ally ? (
    <UserSelectItemBlock ally onClick={onClick} id={id}></UserSelectItemBlock>
  ) : (
    <UserSelectItemBlock onClick={onClick} id={id}></UserSelectItemBlock>
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
