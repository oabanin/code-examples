import { getCurrencies } from 'src/api/dictionaries/currencies';

import { useQuery } from 'react-query';

const useCurrencies = (options) =>
  useQuery(['currencies'], getCurrencies, {
    select: (result) => {
      if (result?.status !== 200) {
        return result;
      }
      return result.data.items.map((item) => ({
        value: item.id,
        id: item.id,
        label: item.code.toUpperCase(),
        ...item,
      }));
    },
    ...options,
  });

export { useCurrencies };
