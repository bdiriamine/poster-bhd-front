/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.posterxxl.de',
        },

      ],
    },
  }
export default nextConfig;
