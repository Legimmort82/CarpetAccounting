/** @type {import('next').NextConfig} */

import createPWA from '@ducanh2912/next-pwa';

const withPWA = createPWA({
  dest: "public",
  register: true,
  disable: false,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
