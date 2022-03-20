import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const MenuBtn: React.FC = () => {
  return (
    <IconButton color="secondary" type="button">
      <MenuOutlinedIcon />
    </IconButton>
  );
};

export default MenuBtn;
