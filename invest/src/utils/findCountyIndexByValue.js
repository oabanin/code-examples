export const findCountyIndexByValue = (value, values) =>
  values?.findIndex((item) => item?.code === value);
