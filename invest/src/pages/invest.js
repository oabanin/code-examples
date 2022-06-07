import pick from 'lodash/pick';
import Head from 'next/head';

function Invest() {
  return (
    <>
      <Head>
        <title>Invest - Invest.com</title>
      </Head>
      <h1>Invest</h1>
    </>
  );
}

export default Invest;

Invest.messages = ['Layout'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, Invest.messages),
    },
  };
}
