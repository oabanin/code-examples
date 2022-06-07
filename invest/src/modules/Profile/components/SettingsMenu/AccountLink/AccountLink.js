import s from 'src/modules/Profile/components/SettingsMenu/AccountLink/AccountLink.module.scss';

import Link from 'src/components/Links/Link';

function AccountLink({ name, path, prefix, disabled, subPaths }) {
  return (
    <Link
      subPaths={subPaths}
      disabled={disabled}
      noScrollToTop
      s={s}
      name={name}
      path={path}
      prefix={prefix}
    />
  );
}

export default AccountLink;
