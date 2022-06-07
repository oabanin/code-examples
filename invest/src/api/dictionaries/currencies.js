import { axiosInstance } from 'src/api/instance';

export const getCurrencies = async () =>
  axiosInstance.get(`/dictionaries/currencies?page=1&limit=200`);
