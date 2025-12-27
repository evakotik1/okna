
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   transpilePackages: ['date-fns', '@pbe/react-yandex-maps'],
// }

// module.exports = nextConfig

// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   transpilePackages: ['date-fns', '@pbe/react-yandex-maps'],
  
//   // ИСКЛЮЧИТЬ API ИЗ СБОРКИ
//   pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'], // без route.ts
  
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
  
//   // Перенаправить все API запросы
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://placeholder.com/api/:path*', // или просто /404
//       },
//     ];
//   },
// }

// module.exports = nextConfig