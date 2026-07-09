// const isProd = process.env.NODE_ENV === "production";

// const nextConfig = {
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;
const nextConfig = {
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.divyanshusaini.me' }],
        destination: 'https://divyanshusaini.me/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;