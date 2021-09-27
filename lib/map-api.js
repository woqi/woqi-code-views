//映射github

const axios = require('axios')
const isServer = typeof window === 'undefined'
const github_base_url = 'https://api.github.com'

async function requestGitHub(method, url, data = {}, headers) {
  return await axios({
    method, url: `${github_base_url}${url}`, data, headers
  })
}

async function request({ method = 'GET', url, data = {} }, req, res) {
  if (!url) { throw Error('url must provide') }
  if (isServer) {//是服务器
    const session = req.session
    const githubAuth = session.githubAuth || {}
    const headers = {}
    headers['Accept'] = 'application/vnd.github.v3+json'
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
    }
    // console.log('服务器---',url)
    return await requestGitHub(method, url, data, headers)
  } else {
    // console.log('!服务器---',url)
    return await axios({
      method,
      url: `/github${url}`,
      data
    })
  }
}

module.exports = {
  request, requestGitHub
}