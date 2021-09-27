import { Avatar, Button } from 'antd'
import { useState, useCallback, Fragment } from 'react'
import { getLastUpdated } from '../lib/utils'

import IssueDetail from './IssueDetail'

export default function IssueItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false)
  const toggleShowDetail = useCallback(() => {
    //逃避闭包
    setShowDetail((d) => !d)
  }, [])
  return (
    <Fragment>
      <div className='issue'>
        <div className='avatar'>
          <Avatar src={issue.user.avatar_url} shape='square' size={50}></Avatar>
        </div>

        <div className='main-info'>
          <h6>
            <span>{issue.title}</span>
            <p className='sub-info'>
              <span>Updated at {getLastUpdated(issue.updated_at)}</span>
            </p>
          </h6>
        </div>

        <Button
          type='primary'
          size='small'
          style={{
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
          }}
          onClick={toggleShowDetail}
        >
          {showDetail ? '隐藏' : '查看'}
        </Button>

        <style jsx>{`
          .issue {
            display: flex;
            position: relative;
            padding: 10px;
          }
          .issue:hover {
            background: #fafafa;
          }
          .issue + .issue {
            border-top: 1px solid #eee;
          }
          .main-info > h6 {
            max-width: 600px;
            font-size: 16px;
            padding-right: 40px;
          }
          .avatar {
            margin-right: 20px;
          }
          .sub-info {
            margin-bottom: 0;
          }
          .sub-info > span + span {
            display: inline-block;
            margin-left: 20px;
            font-size: 12px;
          }
        `}</style>
        {showDetail ? <IssueDetail issue={issue} /> : null}
      </div>
    </Fragment>
  )
}
