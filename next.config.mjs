/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',

      },
      {
        protocol: 'https',
        hostname: 'www.postergully.com',
        pathname: '/cdn/shop/products/**',

      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
        pathname: '/images/I/**',

      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
