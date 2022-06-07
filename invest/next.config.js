const images = require('next-images');
const withPlugins = require('next-compose-plugins');
const path = require('path');
const shortid = require('shortid');

const conf = {
  env: {
    version: shortid.generate(),
  },
  swcMinify: false,
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Expect-CT',
            value: 'enforce, max-age=86400',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          {
            key: 'X-UA-Compatible',
            value: 'IE=edge; chrome=1',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/(.*).(avif|jpg|jpeg|png|webp|gif|ico|woff2|svg|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536777, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins(
  [[images, { inlineImageLimit: 1, exclude: path.resolve(__dirname, 'public/svg') }]],
  conf,
);
