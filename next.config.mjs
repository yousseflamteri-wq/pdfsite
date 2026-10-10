/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/add-watermark',
        destination: '/watermark-pdf',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;