import { handleAmount } from 'src/utils/string/handleAmout/handleAmount';

export const useAmountHandler = ({ handleChange }) => {
  const handleAmountField = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    if (e.target.value !== '') {
      e.target.value = +e.target.value;
    }
    e.target.value = handleAmount(e.target.value);
    handleChange(e);
  };
  return { handleAmountField };
};
