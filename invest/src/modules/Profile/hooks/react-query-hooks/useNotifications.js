import { getNotifications } from 'src/api/users';

import { useQuery } from 'react-query';

const useNotifications = (options) =>
  useQuery('users/me/profile/subscriptions', () => getNotifications(), options);

export { useNotifications };
