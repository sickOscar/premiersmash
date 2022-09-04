/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'www.adnkronos.com',
    ],
  }
}

module.exports = nextConfig
