import pick from 'lodash/pick';
import Head from 'next/head';

function Home() {
  return (
    <Head>
      <title>Home - Invest.com</title>
    </Head>
  );
}

export default Home;

Home.messages = ['Layout', 'Home'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, Home.messages),
    },
  };
}
