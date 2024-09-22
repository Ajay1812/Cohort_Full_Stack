import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const createHandleMenuClick = (menuItem, onChange, handleClose) => {
  return () => {
    onChange(menuItem);
    handleClose();
  };
};

export function DropDownMenu({ onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Select Price
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={createHandleMenuClick('2999', onChange, handleClose)}>2999 INR</MenuItem>
        <MenuItem onClick={createHandleMenuClick('3999', onChange, handleClose)}>3999 INR</MenuItem>
        <MenuItem onClick={createHandleMenuClick('4999', onChange, handleClose)}>4999 INR</MenuItem>
      </Menu>
    </div>
  );
}
