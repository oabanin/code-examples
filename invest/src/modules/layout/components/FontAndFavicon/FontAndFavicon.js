import Head from 'next/head';

function FontsAndFavicon() {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/favicon.webp" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {process.env.NEXT_PUBLIC_ENV === 'development' && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `
                      @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: local(''),
                 url('/fonts/roboto-v29-latin-300.woff2') format('woff2');
          }
            
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local(''),
                 url('/fonts/roboto-v29-latin-regular.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local(''),
                 url('/fonts/roboto-v29-latin-500.woff2') format('woff2');
          }
                    @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local(''),
                 url('/fonts/roboto-v29-latin-700.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Roboto Condensed';
            font-style: normal;
             font-display: swap;
            font-weight: 400;
            src: local(''),
                 url('/fonts/roboto-condensed-v24-latin-regular.woff2');
}`,
          }}
        />
      </Head>
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/roboto-v29-latin-regular.woff2"
        importance="low"
      />

      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/roboto-v29-latin-500.woff2"
        importance="low"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/roboto-v29-latin-700.woff2"
        importance="low"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/roboto-v29-latin-300.woff2"
        importance="low"
      />

      <link
        rel="preload"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        href="/fonts/roboto-condensed-v24-latin-regular.woff2"
        importance="low"
      />
    </>
  );
}

export default FontsAndFavicon;
