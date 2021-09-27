import { useState, useCallback } from 'react'

import withRepoBasic from "../../components/with-repo-basic";
const map_api = require('../../lib/map-api')


import IssueItem from "../../components/IssueItem";
import SearchUser from "../../components/SearchUser";

function Issues({ issues }) {
  const [creator, setCreator] = useState()

  const handleCreatorChange = useCallback(value => {
    setCreator(value)
  }, [])

  return (
    <div className="root">
      <SearchUser />
      <div className="issues">

        {issues.map(issue => (
          <IssueItem issue={issue} key={issue.id} />
        ))}
      </div>

      {/* <IssueDetail /> */}

      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .search {
          display: flex;
        }
        .loading {
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

    </div>
  )
}
Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query
  const issuesResp = await map_api.request({
    url: `/repos/${owner}/${name}/issues`
  }, ctx.req, ctx.res)
  return { issues: issuesResp.data }
}
export default withRepoBasic(Issues, 'issues')