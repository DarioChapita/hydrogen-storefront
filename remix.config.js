// /** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
//   appDirectory: 'app',
//   ignoredRouteFiles: ['**/.*'],
//   watchPaths: ['./public', './.env'],
//   server: './server.js',
//   publicPath: (process.env.HYDROGEN_ASSET_BASE_URL ?? '/') + 'build/',
//   assetsBuildDirectory: 'dist/client/build',
//   serverBuildPath: 'dist/worker/index.js',
//   serverMainFields: ['browser', 'module', 'main'],
//   serverConditions: ['worker', process.env.NODE_ENV],
//   serverDependenciesToBundle: 'all',
//   serverModuleFormat: 'esm',
//   serverPlatform: 'neutral',
//   serverMinify: process.env.NODE_ENV === 'production',
//   externalDependencies: ['axios'],
//   platform: 'node',
//   future: {
//     v3_fetcherPersist: true,
//     v3_relativeSplatpath: true,
//     v3_throwAbortReason: true,
//   },
// };

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: 'app',
  ignoredRouteFiles: ['**/.*'],
  watchPaths: ['./public', './.env'],
  server: './server.js',
  publicPath: (process.env.HYDROGEN_ASSET_BASE_URL ?? '/') + 'build/',
  assetsBuildDirectory: 'dist/client/build',
  serverBuildPath: 'dist/worker/index.js',
  serverMainFields: ['browser', 'module', 'main'],
  serverConditions: ['worker', process.env.NODE_ENV],
  serverDependenciesToBundle: 'all',
  serverModuleFormat: 'esm',
  serverPlatform: 'neutral',
  serverMinify: process.env.NODE_ENV === 'production',
  platform: 'node',
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatpath: true,
    v3_throwAbortReason: true,
  },
};