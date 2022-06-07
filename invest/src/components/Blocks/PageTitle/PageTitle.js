import { useTranslations } from 'next-intl';
import ImportIcon from 'public/svg/layout/header/icons/inbox.svg';

import s from './PageTitle.module.scss';

function PageTitle({ title, text }) {
  const t = useTranslations('Layout');
  return (
    <div className={s.container}>
      <div className={s.left}>
        <h2 className={s.title}>{title}</h2>
        <div className={s.divider} />
        <p className={s.text}>{text}</p>
      </div>
      <div className={s.right}>
        <button className={s.button}>
          <ImportIcon className={s.icon} />
          {t('Inbox')}
          <div className={s.counter}>96</div>
        </button>
      </div>
    </div>
  );
}

export default PageTitle;
