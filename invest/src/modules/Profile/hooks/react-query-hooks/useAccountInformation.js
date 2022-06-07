import { getUsersMe } from 'src/api/users';

import { useQuery } from 'react-query';

const useAccountInformation = (options) => useQuery('users/me', () => getUsersMe(), options);

export { useAccountInformation };
