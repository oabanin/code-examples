import { useEffect } from 'react';

import { useSavePageState } from './useSavePageState';
import { useToggle } from './useToggle';

const useToggleNotSavedState = (isLoaded, pageKey) => {
  const { getValues } = useSavePageState(pageKey);

  const [showModalLStoForm, toggleShowModalLStoForm] = useToggle();

  useEffect(() => {
    if (!pageKey) {
      return;
    }

    const pageValues = getValues();

    if (isLoaded && pageValues) {
      toggleShowModalLStoForm();
    }
  }, [isLoaded]);

  return {
    showModalLStoForm,
    toggleShowModalLStoForm,
  };
};

export { useToggleNotSavedState };
