import s from 'src/modules/Profile/components/ProfileLayout/ProfileLayout.module.scss';
import SettingsMenu from 'src/modules/Profile/components/SettingsMenu/SettingsMenu';

import PageTitle from 'src/components/Blocks/PageTitle/PageTitle';

import { useTranslations } from 'next-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function ProfileLayout({ children }) {
  const t = useTranslations('Settings');
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <div className={s.titleContainer}>
            <PageTitle title={t('settings')} text={t('manage')} />
          </div>
        </div>
        <div className={s.mobileBorder} />
        <div className={s.background}>
          <div className="container">
            <SettingsMenu />
          </div>
        </div>
        <div className={s.backgroundContent}>
          <div className={s.cardContainer}>
            <div className={s.card}>{children}</div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
}

export default ProfileLayout;
