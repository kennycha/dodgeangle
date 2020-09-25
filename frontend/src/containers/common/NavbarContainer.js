import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';

const NavbarContainer = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const onBtnClick = () => {
    setMenuClicked(!menuClicked);
  };
  return <Navbar menuClicked={menuClicked} onBtnClick={onBtnClick} />;
};

export default NavbarContainer;
