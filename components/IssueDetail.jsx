import dynamic from 'next/dynamic'
import { Button,Spin } from 'antd'

const MDRender = dynamic(() => import('./MarkdownRender'), {
  loading: () => <Spin />,
})

export default function IssueDetail({ issue }) {
  return (
    <div className='issue_detail'>
      <MDRender content={issue.body}></MDRender>
      <div className='actions'>
        <Button href={issue.html_url} target='_blank'>
          打开Issue讨论页面
        </Button> 
      </div>
      <style jsx>{`
        .issue_detail {
          background: #fefefe;
          padding: 20px;
        }
        .actions {
          text-align: right;
        }
      `}</style>
    </div>
  )
}
