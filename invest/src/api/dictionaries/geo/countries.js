import { axiosInstance } from 'src/api/instance';

import axios from 'axios';
import { stringify } from 'query-string';

const { CancelToken } = axios;

let cancelToken;
export const getCountriesAutocomplete = async (page, limit, searchValue, region_id) => {
  if (cancelToken !== undefined) {
    cancelToken();
  }

  return axiosInstance
    .get(
      `/dictionaries/geo/countries?${stringify({ page, limit, search: searchValue, region_id })}`,
      {
        cancelToken: new CancelToken((c) => {
          cancelToken = c;
        }),
      },
    )
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        // console.log('Request canceled');
      } else {
        console.error(thrown, 'error');
      }
    });
};
