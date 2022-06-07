import { getRiskAndRange } from 'src/api/users';

import { useQuery } from 'react-query';

const useRiskAndRange = (options) =>
  useQuery('/users/me/profile/risk-and-range', () => getRiskAndRange(), options);

export { useRiskAndRange };
