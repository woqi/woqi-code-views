// const withCss = require('@zeit/next-css')
// if (typeof require != 'undefined') {
//   require.extensions['css'] = file => { }
// }
// modeule.exports = withCss({})

const config = require('./config')


module.exports = {
  publicRuntimeConfig: {
    // staticFolder: '/static',
    GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL
  },
}