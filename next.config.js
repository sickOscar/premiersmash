/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'upload.wikimedia.org',
      'www.adnkronos.com',
      's.yimg.com',
      'images2.corriereobjects.it',
      'theblondesalad.com'
    ],
  }
}

module.exports = nextConfig
