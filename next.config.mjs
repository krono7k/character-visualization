/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["rickandmortyapi.com"],
    },
    async redirects() {
        return [
          {
            source: '/characterList',
            destination: '/',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
