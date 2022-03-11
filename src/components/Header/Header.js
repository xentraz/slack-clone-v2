// Components
import React from 'react';
// Styles
import '../../scss/styles.scss';
// Material UI
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <Avatar 
        className="header-avatar"
        alt={'user?.displayName'}
        src={'user?.photoURL'}
        />
        {/* Avatar for logged in user */}
        <AccessTimeIcon />
        {/* Time icon */}
      </div>
      <div className="header-search">
        <SearchIcon />
        {/* Search Icon */}
        <input 
        className="header-search-input"
        type="text" 
        placeholder="Search" 
        />
        {/* Input */}
      </div>
      <div className="header-right">
        <HelpOutlineIcon/>
        {/* Help icon */}
      </div>
    </div>
  )
}

export default Header;