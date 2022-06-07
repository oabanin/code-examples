import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

const useConfirmAddFromLS = ({
  showModalLStoForm,
  toggleShowModalLStoForm,
  setValues,
  clearValues,
  getValues,
}) => {
  const t = useTranslations();
  useEffect(() => {
    if (showModalLStoForm) {
      setTimeout(() => {
        const isAddLStoForm = window.confirm(t('Settings.restoreDate'));
        if (isAddLStoForm) {
          toggleShowModalLStoForm(null);
          const values = getValues();
          setValues({
            ...values,
          });
          clearValues();
        } else {
          clearValues();
        }
      }, 500);
    }
  }, [showModalLStoForm]);
};

export { useConfirmAddFromLS };
