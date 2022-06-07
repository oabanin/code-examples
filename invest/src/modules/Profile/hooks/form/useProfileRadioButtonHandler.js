export const useProfileRadioButtonHandler = ({ setFieldValue, setFieldTouched }) => {
  const handleRadioButton = ({ field, value }) => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  return { handleRadioButton };
};
