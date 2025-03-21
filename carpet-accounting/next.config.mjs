/** @type {import('next').NextConfig} */

import createPWA from "@ducanh2912/next-pwa";

const withPWA = createPWA({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
