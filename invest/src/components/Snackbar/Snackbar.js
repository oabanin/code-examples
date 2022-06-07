import React from 'react';

import Snackbar from '@mui/material/Snackbar';

import s from './Snackbar.module.scss';

function SnackbarCustom({ snackBarText, setSnackBarText }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={Boolean(snackBarText)}
      onClose={() => setSnackBarText('')}
      message={snackBarText}
      autoHideDuration={3000}
    />
  );
}

export default SnackbarCustom;
