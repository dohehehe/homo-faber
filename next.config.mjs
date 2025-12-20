/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ugybuzfzmywmnbsikhtf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // 이미지 최적화 설정
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};
export default nextConfig;
