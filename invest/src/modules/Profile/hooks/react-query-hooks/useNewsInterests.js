import { getNewsInterests } from 'src/api/users';

import { useQuery } from 'react-query';

const useNewsInterests = (options) =>
  useQuery('/users/me/profile/news-interests', () => getNewsInterests(), options);

export { useNewsInterests };
