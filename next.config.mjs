/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "as2.ftcdn.net",
      },
      {
        hostname: "www.marketsmedia.com",
      },
      {
        hostname: "static1.bigstockphoto.com",
      },
      {
        hostname: "www.theforage.com",
      },
      {
        hostname: "www.livemint.com",
      },
      {
        hostname: "moneyexcel.com",
      },
      {
        hostname: "images.financialmodelingprep.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore all TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore all ESLint errors
  },
};

export default nextConfig;
