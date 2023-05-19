const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  basePath: '/PDFActions',
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
