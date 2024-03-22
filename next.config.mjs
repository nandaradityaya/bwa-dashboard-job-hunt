/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ncektaaowatlgnwgcbri.supabase.co",
      },
    ],
  },
};

export default nextConfig;
