export const useCheckBoxPanelHandler = ({ values, setFieldValue, setFieldTouched }) => {
  const handleCheckbox = ({ field, value }) => {
    let newArr;
    if (values[field].includes(value)) {
      newArr = values[field].filter((item) => item !== value);
    } else {
      newArr = [...values[field]];
      newArr.push(value);
    }
    setFieldValue(field, newArr.sort());
    setFieldTouched(field, true, false);
  };

  return { handleCheckbox };
};
