import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function AlertBox({ message, color}) {
    console.log(message);
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={color}>
      {message}
    </Alert>
  );
}