const removeNonDigits = (string) => {
  if (!string) return '';
  return string.toString().replace(/\D/g, '');
};

export { removeNonDigits };
