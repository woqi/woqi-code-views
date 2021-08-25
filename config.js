
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const SCOPE = 'user'

const client_id = 'Iv1.7bce592037053839'

module.exports = {
  github: {
    client_id,
    client_secret: '74744a96d52a9f8b668492865b0c0e1b9d8cf7e8',
    request_token_url: 'https://github.com/login/oauth/access_token',
  },
  OAUTH_URL:`${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`

}


