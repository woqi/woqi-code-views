import Link from 'next/link'
import { Icon } from 'antd'


import { getLastUpdated } from '../lib/utils'

function getLicense(license) {
  return license ? `${license.spdx_id} license` : ''
}

export default ({ repo }) => {
  return (
    <div className="repo-root">
      <div className="basic-info">
        <h3 className="repo-title">
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.name}</a>
          </Link>
        </h3>
        <p className="repo-desc">{repo.description}</p>
        <p className="other-info">
          {repo.license ? (
            <span className="license">{getLicense(repo.license)}</span>
          ) : null}
          <span className="last-updated">
            {getLastUpdated(repo.updated_at)}
          </span>
          <span className="open-issues">
            {repo.open_issues_count} open issues
          </span>
        </p>
      </div>
      <div className="lang-star">
        <span className="lang">{repo.language}</span>
        <span className="stars">
          {repo.stargazers_count} <Icon type="star" theme="filled" />
        </span>
      </div>

      <style jsx>{`
        .repo-root {
          display: flex;
          justify-content: space-between;
        }
        .repo-root .other-info > span + span {
          margin-left: 10px;
        }
        .repo-root + .repo-root {
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        .repo-root .repo-title {
          font-size: 20px;
        }
        .repo-root .lang-star {
          display: flex;
        }
        .repo-root .lang-star > span {
          width: 120px;
          text-align: right;
        }
        .repo-root .repo-desc {
          width: 400px;
        }
      `}</style>
      
    </div>
  )
}
