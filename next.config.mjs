/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches any hostname
        port: '',       // Leave blank to allow all ports
        pathname: '**', // Matches any pathname
      },
    ],
  },
};

export default nextConfig;

  

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['avatars.githubusercontent.com'], // Allow images from this domain
//     },
//   };
  
//   export default nextConfig;
  