import Link from 'next/link'
import { withRouter } from 'next/router'
import { useEffect } from 'react'

import Repo from './Repo'
import { get, cache } from '../lib/repo-basic-cache'

const map_api = require('../lib/map-api') //映射api

function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, [])
    .join('&')
  return `?${query}`
}

const isServer = typeof window === 'undefined'
export default function (Comp, type = 'index') {
  function WithDetail({ repoBasic, router, ...rest }) {
    const query = makeQuery(router.query)

    useEffect(() => {
      if (!isServer) {
        cache(repoBasic)
      }
    })

    return (
      <div className='root'>
        <div className='repo-basic'>
          <Repo repo={repoBasic}></Repo>
          <div className='tabs'>
            {type === 'index' ? (
              <span className='tab index'>Redame</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className='tab index'>Redame</a>
              </Link>
            )}

            {type === 'issues' ? (
              <span className='tab index'>Issues</span>
            ) : (
              <Link href={`/detail/issues${query}`}>
                <a className='tab issues'>Issues</a>
              </Link>
            )}
          </div>
        </div>

        <div>
          <Comp {...rest}></Comp>
        </div>

        <style jsx>{`
          @import '../../static/Detail.css';
        `}</style>
      </div>
    )
  }
  WithDetail.getInitialProps = async (context) => {
    const { router, ctx } = context
    const { owner, name } = ctx.query
    const full_name = `${owner}/${name}`

    let pageData = {}
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context)
    }
    if (get(full_name)) {
      return { repoBasic: get(full_name), ...pageData }
    }
    const repoBasic = await map_api.request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res
    )

    return { repoBasic: repoBasic.data, ...pageData }
  }

  return withRouter(WithDetail)
}
