/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
