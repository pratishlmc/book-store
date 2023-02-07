/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/canceled",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;