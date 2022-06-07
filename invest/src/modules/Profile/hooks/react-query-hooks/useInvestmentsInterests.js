import { getInvestmentInterests } from 'src/api/users';

import { useQuery } from 'react-query';

const useInvestmentsInterests = (options) =>
  useQuery('/users/me/profile/investment-interests', () => getInvestmentInterests(), options);

export { useInvestmentsInterests };
