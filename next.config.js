const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
});


const path = require('path');


module.exports = withPWA({
  basePath: '/PDFActions',
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false,crypto: require.resolve("crypto-browserify") };

    config.experiments ={topLevelAwait: true, asyncWebAssembly: true};
    
    config.module.rules.push({
      test: /\.wasm$/,
      type:
        "javascript/auto" /** this disables webpacks default handling of wasm */,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "wasm/[name].[hash].[ext]",
            publicPath: "/dist/"
          }
        }
      ]
    });
    return config;
  },
});
