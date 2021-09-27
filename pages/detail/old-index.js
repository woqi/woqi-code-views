import Repo from "../../components/Repo";
import Link from "next/link";
import Router, { withRouter } from "next/router"

const map_api = require('../../lib/map-api')//映射api
function makeQuery(queryObject) { 
  const query = Object.entries(queryObject)
  .reduce((result,entry)=>{
    result.push(entry.join('='))
    return result
  },[]).join('&')
  return `?${query}`
}
function Detail({ repoBasic, router }) {
  console.log('router---',router)
  const query = makeQuery(router.query)
  return (
    <div className="root">
      <div className="repo-basic">
        <Repo repo={repoBasic}></Repo>
        <div className="tabs">
          <Link href={`/detail${query}`}>
            <a className="tab index">Redame</a>
          </Link>
          <Link href={`/detail/issues${query}`}>
            <a className="tab issues">Issues</a>
          </Link>

        </div>
      </div>

      <div>Readme</div>
      <style jsx>{`@import "../../static/Detail.css";`}</style>
    </div>
  )
}
Detail.getInitialProps = async ({ ctx }) => {
  console.log('----------------!!!1----------呵呵--------')
  // const { owner, name } = router.query
  try {
    const repoBasic = await map_api.request({
      url: `/repos/${ctx.query.owner}/${ctx.query.name}`
    }, ctx.req, ctx.res)
    // console.log('-------------repoBasic-----------res----------', repoBasic)
    console.log('--------------!!!2--------------------')

    return { repoBasic: repoBasic.data }
  } catch (error) {
    console.log('error---', error)
  }

}

export default withRouter(Detail)