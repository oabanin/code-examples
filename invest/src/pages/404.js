import Page404 from 'src/modules/Page404/Page404';

import pick from 'lodash/pick';
import Head from 'next/head';

function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Invest.com</title>
      </Head>
      <Page404 />
    </>
  );
}

export default NotFound;

NotFound.messages = ['Layout', 'Error404'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, NotFound.messages),
    },
  };
}
