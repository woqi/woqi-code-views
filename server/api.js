const axios = require("axios")

// const github_base_url = 'https://api.github.com'
const { requestGitHub } = require('../lib/map-api')


module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method

    if (path.startsWith('/github/')) {
      console.log('----ctx.request.body----', ctx.request.body)
      const session = ctx.session
      const githubAuth = session && session.githubAuth
      const headers = {}
      if (githubAuth && githubAuth.access_token) {
        headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
      }
      const result = await requestGitHub(
        method,
        ctx.url.replace('/github/', '/'),
        ctx.request.body || {},
        headers,
      )
      console.log('---result--', result)

      ctx.status = result.status
      ctx.body = result.data
    } else {
      await next()
    }
  })
}

// module.exports = server => {
//   server.use(async (ctx, next) => {
//     const path = ctx.path
//     if (path.startsWith('/github/')) {
//       console.log('---github----github----github----')
//       const githubAuth = ctx.session.githubAuth
//       const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`
//       console.log('githubPath---', githubPath)

//       const token = githubAuth && githubAuth.access_token
//       let headers = {}
//       if (token) {
//         headers['Authorization'] = githubAuth.token_type + token
//       }
//       try {
//         const res = await axios({
//           method: 'GET',
//           url: githubPath,
//           headers
//         })
//         if (res.status === 200) {
//           ctx.body = res.data
//           ctx.set('Content-Type', 'application/json')
//         } else {
//           ctx.status = res.status
//           ctx.body = { success: false }
//           ctx.set('Content-Type', 'application/json')

//         }
//       } catch(err) {
//         console.log(err)
//       }
//     } else {
//       await next()
//     }
//   })
// }