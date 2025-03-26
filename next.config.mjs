/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.kitsu.app",
        port: "",
      },
      {
        protocol: "https",
        hostname: "uploads.mangadex.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;