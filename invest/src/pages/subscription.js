import PageSubscription from 'src/modules/PageSubscription/PageSubscription';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

function Subscription() {
  const t = useTranslations('Subscription');

  return (
    <>
      <Head>
        <title>{t('Subscription')} - Invest.com</title>
        <meta name="title" content={t('Subscription')} />
        <meta name="description" content={t('Subscription')} />
      </Head>
      <PageSubscription />
    </>
  );
}

export default Subscription;

Subscription.messages = ['Layout', 'Subscription', 'SubscriptionPlansInput'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, Subscription.messages),
    },
  };
}
