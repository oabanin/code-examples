import { getExperienceAndStatus } from 'src/api/users';

import { useQuery } from 'react-query';

const useExperienceAndStatus = (options) =>
  useQuery('/users/me/profile/experience-and-status', () => getExperienceAndStatus(), options);

export { useExperienceAndStatus };
