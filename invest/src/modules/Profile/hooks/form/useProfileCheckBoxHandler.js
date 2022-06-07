import { useCallback } from 'react';

export const useProfileCheckBoxHandler = ({ values, setFieldValue, setFieldTouched }) => {
  const handleCheckbox = useCallback(
    (e) => {
      const { name } = e.target;
      const { value } = e.target;
      let newArr;
      if (values[name].includes(value)) {
        newArr = values[name].filter((item) => item !== value);
      } else {
        newArr = [...values[name]];
        newArr.push(value);
      }
      setFieldValue(name, newArr.sort());
      setFieldTouched(name, true, false);
    },
    [values],
  );

  return { handleCheckbox };
};
