import { getRegionsAutocomplete } from 'src/api/dictionaries/geo/regions';

import { useQuery } from 'react-query';

const useRegions = (options) =>
  useQuery(['regions'], getRegionsAutocomplete, {
    select: (result) => {
      if (result?.status !== 200) {
        return result;
      }
      return result.data.items.map((item) => ({
        value: item.id,
        id: item.id,
        label: item.title,
        ...item,
      }));
    },
    ...options,
  });

export { useRegions };
