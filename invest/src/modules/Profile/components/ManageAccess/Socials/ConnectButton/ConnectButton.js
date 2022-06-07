import Button from 'src/components/Buttons/MuiButton/Button';

import { useTranslations } from 'next-intl';

function ConnectButton({ onClick, disabled, ...props }) {
  const t = useTranslations();
  return (
    <Button
      type="submit"
      onClick={onClick}
      size="small"
      fullWidth
      variant="outlined"
      color="secondary"
      disabled={disabled}
      {...props}
    >
      {t('SettingsManageAccess.connect')}
    </Button>
  );
}

export default ConnectButton;
