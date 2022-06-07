export const usePhoneNumber = ({ handleChange }) => {
  const handlePhoneNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    e.target.value = `+${e.target.value}`;
    handleChange(e);
  };
  return { handlePhoneNumber };
};
