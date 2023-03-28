const withLess = require('next-with-less');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  withLess({
    trailingSlash: true,
    images: {
      path: '/',
    },
  })
);
