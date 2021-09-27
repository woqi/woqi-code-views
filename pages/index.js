import Router, { withRouter } from "next/router"
import { useEffect } from 'react'
import getConfig from "next/config"
import { connect } from 'react-redux'
import { Button, Icon, Tabs } from "antd"

import Repo from '../components/Repo'
import { cacheArray } from '../lib/repo-basic-cache'

const map_api = require('../lib/map-api')//映射api
const { publicRuntimeConfig } = getConfig()
let cachedUserRepos, cachedUserStarred
const isServer = typeof window === 'undefined'


function Index({ user, userRepos, userStarred, router }) {
  // console.log('router---------',router)

  const tabKey = router.query.key || '1'

  const handleTabChange = activeKey => {
    console.log('sb···', activeKey)
    Router.push(`/?key=${activeKey}`)
  }

  useEffect(() => {

    if (!isServer) {
      cachedUserRepos = userRepos
      cachedUserStarred = userStarred
      const timeout = setTimeout(() => {
        cachedUserRepos = null
        cachedUserStarred = null
      }, 1000 * 60 * 10)
    }

  }, [userRepos, userStarred])

  useEffect(() => {
    if (!isServer) {
      cacheArray(userRepos)
      cacheArray(userStarred)
    }
  })

  if (!user || !user.id) {

    return (
      <div className="root">
        <p>亲，您还没有登录哦~</p>
        {/* {`/prepare-auth?url=${router.asPath}`} */}
        {/* {publicRuntimeConfig.OAUTH_URL} */}
        <Button type="primary" href={`/prepare-auth?url=${router.asPath}`}>点击登录</Button>
        <style jsx>{`@import "../static/index.css";`}</style>
      </div>
    )

  }

  return (
    <div className="root-true">
      <div className="user-info">
        <img className="avatar" src={user.avatar_url} alt="头像"></img>
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>

      <div className="user-repos">

        <Tabs activeKey={tabKey}
          onChange={handleTabChange} animated={false}>
          {/* defaultActiveKey="1" */}
          <Tabs.TabPane tab="你的仓库" key="1">
            {/* .filter(e=>e.owner.login === ) */}
            {userRepos.map(repo => (
              <Repo key={repo.id} repo={repo} user={user} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStarred.map(repo => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>

      </div>

      <style jsx>{`@import "../static/index.css";`}</style>
    </div>
  )

}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // console.log('ctx---',ctx)
  const user = reduxStore.getState().user
  if (!user || !user.id) {
    return
  }

  if (!isServer) {
    if (cachedUserRepos && cachedUserStarred) {
      return {
        userRepos: cachedUserRepos,
        userStarred: cachedUserStarred
      }
    }
  }

  const rposRes = await map_api.request({
    url: '/user/repos'
  }, ctx.req, ctx.res)

  const starredRes = await map_api.request({
    url: '/user/starred'
  }, ctx.req, ctx.res)

  return {
    userRepos: rposRes.data,
    userStarred: starredRes.data
  }

  // axios.get('/github/search/repositories?q=react')
  // .then(res=>console.log('res--',res))//这么写报错
}
function mapState(state) {
  return {
    user: state.user,
  }
}


export default withRouter(connect(mapState)(Index))
// export default connect(mapState)(withRouter(Index))//把路由放在最外层

