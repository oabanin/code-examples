const handleAmount = (string) => {
  if (!string) return '';
  return string.toString().replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
};

export { handleAmount };
