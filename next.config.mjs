/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.posterxxl.de',
        },
        {
            protocol: 'http',
            hostname: 'localhost', // Just the hostname
            port: '4000', // Specify the port separately
            
        }

      ],
    },
  }
export default nextConfig;
