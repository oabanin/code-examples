import { useMemo } from 'react';

import deepEqual from 'deep-equal';

const useFormChanged = (values, initialValues) =>
  useMemo(() => !deepEqual(initialValues, values), [initialValues, values]);

export { useFormChanged };
