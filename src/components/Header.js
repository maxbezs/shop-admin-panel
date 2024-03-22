import React from 'react';

import Logout from './Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header style={{display:"flex", alignItems:"center", paddingInline:"10%"}}>
      <h1>Shop Admin Panel</h1>
      <Logout setIsAuthenticated={setIsAuthenticated} />
    </header>
  );
};

export default Header;
