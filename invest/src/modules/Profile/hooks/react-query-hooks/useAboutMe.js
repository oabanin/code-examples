import { getAboutMe } from 'src/api/users';

import { useQuery } from 'react-query';

const useAboutMe = (options) => useQuery('users/me/profile/about-me', () => getAboutMe(), options);

export { useAboutMe };
