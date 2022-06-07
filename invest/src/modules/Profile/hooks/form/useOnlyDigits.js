export const useOnlyDigits = ({ handleChange }) => {
  const handleOnlyDigits = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    handleChange(e);
  };
  return { handleOnlyDigits };
};
