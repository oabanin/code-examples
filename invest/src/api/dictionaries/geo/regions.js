import { axiosInstance } from 'src/api/instance';

export const getRegionsAutocomplete = async () =>
  axiosInstance.get(`/dictionaries/geo/regions?page=1&limit=50`);
