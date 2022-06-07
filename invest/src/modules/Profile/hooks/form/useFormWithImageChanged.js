import { useMemo } from 'react';

import deepEqual from 'deep-equal';

const useFormWithImageChanged = (
  values,
  initialValues,
  confirmedUserImage,
  confirmedProfileImage,
) =>
  useMemo(() => {
    if (confirmedUserImage || confirmedProfileImage) return true;
    return !deepEqual(initialValues, values);
  }, [initialValues, values, confirmedUserImage, confirmedProfileImage]);

export { useFormWithImageChanged };
