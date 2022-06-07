import { useEffect, useState } from 'react';

import { isPlainObject } from 'lodash';

const useSavePageState = (pageKey = '') => {
  const [hasPageValues, setHasPageValues] = useState(false);

  useEffect(() => {
    if (getValues()) {
      setHasPageValues(true);
    } else {
      setHasPageValues(false);
    }
  }, []);

  const getValues = () => {
    try {
      const keyValues = localStorage.getItem(pageKey);

      const json = JSON.parse(keyValues);

      if (!isPlainObject(json)) {
        localStorage.removeItem(pageKey);
        return null;
      }

      return JSON.parse(keyValues) || null;
    } catch (err) {
      localStorage.removeItem(pageKey);
      return null;
    }
  };

  const getValueByKey = (key) => {
    if (!key) {
      return null;
    }

    try {
      const values = getValues();

      if (values) {
        return values[key];
      }

      return null;
    } catch (err) {
      console.log(key, err);
      return null;
    }
  };

  const deleteValueByKey = (key) => {
    if (!key) {
      return false;
    }

    try {
      const values = getValues();

      if (values) {
        delete values[key];

        localStorage.setItem(pageKey, JSON.stringify(values));
        return true;
      }

      return false;
    } catch (err) {
      console.log(key, err);
      return false;
    }
  };

  const updateValues = (values) => {
    if (!pageKey) {
      return false;
    }

    if (!values) {
      return false;
    }

    if (!isPlainObject(values)) {
      return false;
    }

    try {
      const json = getValues();

      localStorage.setItem(
        pageKey,
        JSON.stringify({
          ...json,
          ...values,
        }),
      );
      return true;
    } catch (err) {
      console.log(pageKey, err);
      return false;
    }
  };

  const clearValues = () => {
    setHasPageValues(false);

    localStorage.removeItem(pageKey);
  };

  return {
    hasPageValues,
    updateValues,
    getValues,
    clearValues,
    setHasPageValues,
    deleteValueByKey,
    getValueByKey,
    pageKey,
  };
};

export { useSavePageState };
