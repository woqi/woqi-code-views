const axios = require('axios')
const config = require('../config')

const { client_id, client_secret, request_token_url } = config.github


module.exports = (server) => {
  server.use(async (ctx, next) => {
    // console.log('ctx.path---',ctx.path)
    if (ctx.path === "/auth") {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }

      const res = await axios({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id, client_secret, code
        },
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      })
      console.log('githubAuth-----', res.data)

      // auth----- 200 {
      //   access_token: 'ghu_1URUimtS0wXZuxye9viD4HWcpCJDg21gxDDv',
      //   expires_in: 28800,
      //   refresh_token: 'ghr_clkJzRXQe3LaI6WfKHjMRlx7g4t06n4y5WWLh96Z7UhoFax4P3Cywrx8RQPr4X4XayyFgL1ftKu3',
      //   refresh_token_expires_in: 15897600,
      //   token_type: 'bearer',
      //   scope: ''
      // }

      if (res.status === 200 && (!res.data.error && res.data)) {
        ctx.session.githubAuth = res.data

        const { access_token, token_type } = res.data
        // const { access_token, token_type } = result.data

        const userInfoResP = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        })
        // console.log('userInfoResP-----------', userInfoResP.data)
        ctx.session.userInfo = userInfoResP.data

        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || '/')
        ctx.session.urlBeforeOAuth = ''

      } else {
        const errorMsg = res.data && res.data.err
        ctx.body = `request token failde ${errorMsg}`
      }


    } else {
      await next();
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/logout' && method === 'POST') {
      ctx.session = null
      ctx.body = `logout success`
    } else {
      await next()
    }
  })

  server.use(async (ctx, next) => {
    const path = ctx.path
    const method = ctx.method
    if (path === '/prepare-auth' && method === 'GET') {
      const { url } = ctx.query
      ctx.session.urlBeforeOAuth = url
      ctx.redirect(config.OAUTH_URL)
    } else {
      await next()
    }
  })


}
