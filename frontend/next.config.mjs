/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ibb.co',
            port: '',
            pathname: '/8rdfjfg/**',
          },
        ],
      },
};

export default nextConfig;
