import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { confirmTeamMates } from '../../modules/teamMates';
import { confirmEnemies } from '../../modules/enemies';

const NavbarContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [menuClicked, setMenuClicked] = useState(false);
  const onBtnClick = () => {
    setMenuClicked(!menuClicked);
  };
  const onNewClick = () => {
    dispatch(confirmTeamMates(null));
    dispatch(confirmEnemies(null));
    localStorage.removeItem('teamMates');
    localStorage.removeItem('enemies');
    history.push('/');
  };
  return (
    <Navbar
      menuClicked={menuClicked}
      onBtnClick={onBtnClick}
      onNewClick={onNewClick}
    />
  );
};

export default NavbarContainer;
