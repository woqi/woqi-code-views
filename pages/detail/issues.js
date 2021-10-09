import { useState, useCallback, useEffect } from 'react'
import { Select, Button, Spin } from 'antd'

const map_api = require('../../lib/map-api')
import withRepoBasic from '../../components/with-repo-basic'
import IssueItem from '../../components/IssueItem'
import SearchUser from '../../components/SearchUser'

const Option = Select.Option
const isServer = typeof window === 'undefined'
const CACHE = {}

function makeQuery(creator, state, labels) {
  let creatorStr = creator ? `creator=${creator}` : ''
  let stateStr = state ? `state=${state}` : ''
  let labelStr = ''
  if (labels && labels.length > 0) {
    labelStr = `labels=${labels.join(',')}`
  }

  const arr = []

  if (creatorStr) arr.push(creatorStr)
  if (stateStr) arr.push(stateStr)
  if (labelStr) arr.push(labelStr)

  return `?${arr.join('&')}`
}
function Issues({ issues, labels, owner, name }) {
  const [creator, setCreator] = useState()
  const [state, setState] = useState()
  const [label, setLabel] = useState([])
  const [reprocessingIss, setReprocessingIss] = useState(issues)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (!isServer) {
      CACHE[`${owner}/${name}`] = labels
    }
  }, [owner, name, labels])

  const h_Creator_Change = useCallback(value => {
    setCreator(value)
  }, [])
  const h_State_Change = useCallback(value => {
    setState(value)
  }, [])
  const h_Label_Change = useCallback(value => {
    setLabel(value)
  }, [])

  const h_Search = useCallback(() => {
    map_api
      .request({
        url: `/repos/${owner}/${name}/issues${makeQuery(
          creator,
          state,
          label
        )}`,
      })
      .then(resp => {
        console.log('h_Search', resp.data)
        setReprocessingIss(resp.data)
        setFetching(false)
      })
      .catch(err => {
        console.error(err)
        setFetching(false)
      })
    setFetching(true)
  }, [owner, name, creator, state, label])

  return (
    <div className='root'>
      <div className='search'>
        <SearchUser onChange={h_Creator_Change} data={creator} />

        <Select
          placeholder='状态'
          onChange={h_State_Change}
          value={state}
          style={{ width: 200, marginLeft: 20 }}
        >
          <Option value='all'>all</Option>
          <Option value='open'>open</Option>
          <Option value='closed'>closed</Option>
        </Select>

        <Select
          mode='multiple'
          placeholder='Lable'
          onChange={h_Label_Change}
          value={label}
          style={{ width: 200, marginLeft: 20 }}
        >
          {labels.map(la => {
            return (
              <Option value={la.name} key={la.id}>
                {la.name}
              </Option>
            )
          })}
        </Select>
        <Button
          type='primary'
          style={{ marginLeft: 20 }}
          disabled={fetching}
          onClick={h_Search}
        >
          搜索
        </Button>
      </div>

      {fetching ? (
        <div className='loading'>
          <Spin />
        </div>
      ) : (
        <div className='issues'>
          {reprocessingIss.map(is => (
            <IssueItem issue={is} key={is.id} />
          ))}
        </div>
      )}

      <style jsx>{`
        .search {
          display: flex;
        }
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
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
  const full_name = `${owner}/${name}`

  const res = await Promise.all([
    await map_api.request(
      {
        url: `/repos/${owner}/${name}/issues`,
      },
      ctx.req,
      ctx.res
    ),
    CACHE[full_name]
      ? Promise.resolve({ data: CACHE[full_name] })
      : await api.request(
          {
            url: `/repos/${owner}/${name}/labels`,
          },
          ctx.req,
          ctx.res
        ),
  ])

  return {
    owner,
    name,
    issues: res[0].data,
    labels: res[1].data,
  }
}
export default withRepoBasic(Issues, 'issues')
