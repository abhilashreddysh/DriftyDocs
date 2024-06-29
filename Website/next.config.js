/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH,
  output: "export",
  images: {
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};
<<<<<<< HEAD
<<<<<<< HEAD

module.exports = nextConfig;
=======
=======
>>>>>>> 6b502dc (init docs)
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});
module.exports = withNextra(nextConfig);
// module.exports = nextConfig
<<<<<<< HEAD
>>>>>>> 6b502dc (init docs)
=======
>>>>>>> 6b502dc (init docs)
