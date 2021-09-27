// const withCss = require('@zeit/next-css')
// if (typeof require != 'undefined') {
//   require.extensions['css'] = file => { }
// }
// modeule.exports = withCss({})

const webpack = require('webpack')
const config = require('./config')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withPlugins = require('next-compose-plugins')


const nextConfig = {
  publicRuntimeConfig: {
    // staticFolder: '/static', 
    GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL
  },
}

const AnalyzerConfig = withBundleAnalyzer({
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    }
  }
})

module.exports = withPlugins(
  // [AnalyzerConfig],
  [nextConfig],
  {
    webpack: (config, options) => {
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
      return config
    }
  })


