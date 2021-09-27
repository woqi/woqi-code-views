import { Fragment } from 'react';
import dynamic from 'next/dynamic'

import withRepoBasic from '../../components/with-repo-basic'

const map_api = require('../../lib/map-api') //映射api

const MDRender = dynamic(() => import('../../components/MarkdownRender'), {
  loading: () => <h1>Loading</h1>
})


function Detail({ readme }) {

  return (
    <Fragment>
      <MDRender content={readme.content} isBase64={true} />

    </Fragment>

  )
}
Detail.getInitialProps = async ({
  ctx: {
    query: { owner, name },
    req,
    res,
  },
}) => {
  const readmeResp = await map_api.request(
    {
      url: `/repos/${owner}/${name}/readme`,
      // url: `/repos/${owner}/${name}/readme`,
    },
    req,
    res
  )
  return { readme: readmeResp.data }
}
export default withRepoBasic(Detail, 'index')
