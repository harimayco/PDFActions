const path = require("path");
// Next.js 11 SSR import plugin has a known bug with unnamed Webpack 5 chunks in Node 18+:
// path.dirname(chunk.name) throws when chunk.name is undefined.
const origDirname = path.dirname;
path.dirname = function (p) {
  if (p === undefined) return "/";
  return origDirname.apply(this, arguments);
};

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching,
});

module.exports = withPWA({
  basePath: "/PDFActions",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        constants: false,
        crypto: require.resolve("crypto-browserify"),
      };
    }

    config.experiments = { topLevelAwait: true, asyncWebAssembly: true };

    config.module.rules.push({
      test: /\.wasm$/,
      type: "javascript/auto" /** this disables webpacks default handling of wasm */,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "wasm/[name].[hash].[ext]",
            publicPath: "/dist/",
          },
        },
      ],
    });
    return config;
  },
});
