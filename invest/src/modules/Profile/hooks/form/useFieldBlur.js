export const useFieldBlur = ({ handleBlur, setFieldValue }) => {
  const handleFieldBlur = (e) => {
    handleBlur(e);
    setFieldValue(e.target.name, e.target.value.trim().replace(/ +/g, ' '));
  };
  return { handleFieldBlur };
};
