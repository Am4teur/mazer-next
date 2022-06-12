/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Need to define env vars that are used in the Client Side
  env: {
    URL_DEV: process.env.URL_DEV,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
