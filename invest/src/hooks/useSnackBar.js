import { useContext } from 'react';

import { AppContext } from 'src/context/context';

export const useSnackBar = () => {
  const { setSnackBarText } = useContext(AppContext);

  return { enqueueSnackbar: setSnackBarText };
};
