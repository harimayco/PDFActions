const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const path = require('path');

module.exports = withPWA({
  basePath: '/PDFActions',
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false,crypto: require.resolve("crypto-browserify") };

    config.experiments ={topLevelAwait: true, asyncWebAssembly: true};
    

    return config;
  },
});
