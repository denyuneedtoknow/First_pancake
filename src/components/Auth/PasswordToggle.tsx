import React, { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

interface PasswordToggleProps extends StandardTextFieldProps {
  name: string;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({
  name,
  label,
  helperText,
  error,
  onChange,
  onBlur,
  value,
}: PasswordToggleProps) => {
  const [showHidePassword, changeShowHidePassword] = useState(false);

  return (
    <Box display="flex" position="relative">
      <TextField
        fullWidth
        margin="normal"
        size="small"
        required
        color="info"
        type={showHidePassword ? 'text' : 'password'}
        name={name}
        label={label}
        placeholder="password"
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
      />
      <IconButton
        sx={{ position: 'absolute', left: '90%', top: '22%' }}
        onClick={() => changeShowHidePassword(!showHidePassword)}
      >
        <VisibilityOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default PasswordToggle;
