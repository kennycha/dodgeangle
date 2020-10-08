import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mainTheme from '../../lib/styles/mainTheme';

const NavbarBlock = styled.div`
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  font-size: 1.5rem;
  color: ${mainTheme.mainBorder};
`;

const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 3rem;
  padding-right: 2rem;
`;

const LinkBlock = styled.div`
  height: 4rem;
  width: 26rem;
  padding-left: 3rem;
  padding-right: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${mainTheme.mainBorder};
  opacity: 0.65;
  color: ${mainTheme.mainLogoColor};
  border-radius: 30px;
  img {
    width: 40px;
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
`;

const MenuBtn = styled.div`
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${mainTheme.mainBorder};
  padding: 1rem;
  border-radius: 100%;
  opacity: 0.65;
  cursor: pointer;
  z-index: 10;
  img {
    color: white;
    width: 80px;
  }
`;

const Navbar = ({ menuClicked, onBtnClick, onNewClick }) => {
  return (
    <>
      <NavbarBlock>
        <Wrapper>
          {menuClicked ? (
            <LinkBlock>
              <span onClick={onNewClick}>NEW</span>
              <Link to="/">ENTER</Link>
              <Link to="/main">MAIN</Link>
              <img
                src={require('../../img/icons/cancel2.png')}
                alt="cancel"
                onClick={onBtnClick}
              />
            </LinkBlock>
          ) : (
            <MenuBtn onClick={onBtnClick}>
              <img src={require('../../img/icons/menu.png')} alt="menu" />
            </MenuBtn>
          )}
        </Wrapper>
      </NavbarBlock>
    </>
  );
};

export default Navbar;
