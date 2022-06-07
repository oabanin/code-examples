import { useEffect, useState } from 'react';

import { useSavePageState } from 'src/hooks/saveFormToLs/useSavePageState';

import deepEqual from 'deep-equal';

const useSaveFormValues = ({ touched, values, initialValues }, saveDisabled, pageKey) => {
  const [modified, setModified] = useState(false);

  const { clearValues, updateValues } = useSavePageState(pageKey);

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      setModified(true);
    }
  }, [touched]);

  useEffect(() => {
    if (!pageKey) {
      return;
    }
    if (saveDisabled) {
      return;
    }
    if (deepEqual(values, initialValues)) {
      if (modified) {
        clearValues();
      }

      return;
    }
    updateValues(values);
  }, [values, initialValues, modified, saveDisabled]);

  return { modified };
};

export { useSaveFormValues };
