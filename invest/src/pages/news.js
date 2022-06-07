import pick from 'lodash/pick';
import Head from 'next/head';

function News() {
  return (
    <>
      <Head>
        <title>News - Invest.com</title>
      </Head>
      <h1>News</h1>
    </>
  );
}

export default News;

News.messages = ['Layout'];

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: pick((await import(`../intl/${locale}.js`)).default, News.messages),
    },
  };
}
