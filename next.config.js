/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_WEB3_API_TOKEN: process.env.NEXT_PUBLIC_WEB3_API_TOKEN,
  },
};

module.exports = nextConfig;
