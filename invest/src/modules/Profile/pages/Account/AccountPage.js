import AccountForm from 'src/modules/Profile/pages/Account/AccountForm/AccountForm';

import { useBodyMinWidth } from 'src/hooks/useBodyMinWidth';

function AccountPage() {
  useBodyMinWidth();
  return <AccountForm />;
}

export default AccountPage;
