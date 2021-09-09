/**
 * sort:排序方式
 * lang:语言
 * order:排序顺序
 * page:分页页面
 **/
import { useState, useCallback } from "react";
import { withRouter } from "next/router"
import { Row, Col, List, Pagination } from "antd";
import Link from "next/link";
import Router from "next/router";

const map_api = require('../lib/map-api')//映射api
const LANGUAGES = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Java', 'Objective-C', 'Python', 'Ruby', 'PHP']
const SORT_TYPES = [
  {
    name: 'Best match'
  },
  {
    name: 'Most stars',
    value: 'stars',
    order: 'desc'
  },
  {
    name: 'Fewest stars',
    value: 'stars',
    order: 'asc'
  },
  {
    name: 'Most forks',
    value: 'forks',
    order: 'desc'
  },
  {
    name: 'Fewest forks',
    value: 'forks',
    order: 'asc'
  },
  // {
  //   name: 'Recently updated',
  //   value: 'stars',
  //   order: 'desc'
  // },
  // {
  //   name: 'Least recently updated',
  //   value: 'stars',
  //   order: 'desc'
  // },
]

function Search({ router, repos }) {
  console.log('repos---', repos)
  console.log('router---', router)
  // const [open, setOpen] = useState(initialState)
  const { sort, order, lang, query } = router.query

  const doSearch = useCallback((config) => {
    Router.push({
      pathname: '/search',
      query: config
    })
  },[])
  const onDetailsToggle = event => {
    console.log('onDetailsToggle---', event.target.open)
  }

  return (<div className="root">

    <Row gutter={20} type="flex" justify="center" className="mt-lg-4">

      <Col span={4}>


        <div className="border">
          <h2 className="title"> 
            语言
          </h2>
          <ul className="filter-list" >
            {LANGUAGES.map(lan => {
              const selected = lang === lan
              return (
                <li key={lan}>
                  <a className={`filter-item ${selected ? 'filter-item-selected' : ''}`}
                    onClick={() => doSearch({
                      sort,
                      order, query, lang: lan
                    })}
                  >
                    {lan}
                    {selected ? (
                      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"
                        className="filter-item-icon">
                        <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
                      </svg>
                    ) : null}

                    {/* <span className="count">2,724,122</span> */}
                  </a>
                </li>
              )
            }

            )}

          </ul>

        </div>

        <List
          bordered
          className="filter-list"
          header={<span className="list-header">语言</span>}
          style={{ marginBottom: 16 }}
          dataSource={LANGUAGES}
          renderItem={item => {
            const selected = lang === item
            console.log('selected=---=-=-', selected)
            return (
              <List.Item>
                {/* <Link href={`/search${queryString}`}> */}

                <a
                  className={`filter-item  ${selected ? 'filter-item-selected' : ''}`}
                  onClick={() => handleLanguageChange(item)}
                >
                  {item}
                </a>

                {/* </Link> */}
              </List.Item>
            )
          }}
        />

      </Col>

      <Col span={13} className="p-l-r-0">
        <div className="flex-d pb-3 border-bottom">
          <h3>{repos.total_count}个结果</h3>
          <details className="select-menu" onToggle={event => onDetailsToggle(event)}>
            <summary className="select-menu-button" aria-haspopup="menu">

              <i>Sort:</i>
              <span data-menu-button="">Best match</span>
            </summary>

            <div className="select-menu-modal" aria-label="Sort options" >

              <div className="select-menu-header" >
   
                <span className="select-menu-title">Sort options</span>
              </div>

              <div className="select-menu-list" >
                {SORT_TYPES.map(item => {

                  let selected = false
                  if (item.name === 'Best match' && !sort) {
                    selected = true
                  } else if (item.value === sort && item.order === order) {
                    selected = true
                  }
                  return (
                    <a className="select-menu-item"
                      aria-checked="true"
                      key={item.name}
                      onClick={() => {
                        doSearch({
                          lang,
                          query,
                          sort: item.value || '',
                          order: item.order || '',
                        })
                        document.querySelector(".select-menu").open = false;

                      }}>
                      {
                        selected ? (
                          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="select-menu-item-icon">
                            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
                          </svg>
                        ) : null
                      }
                      {/* aria-checked="true" */}

                      <span className="select-menu-item-text" data-menu-button-text="">{item.name}</span>
                    </a>

                  )
                }

                )}

              </div>

            </div>

          </details>

        </div>
      </Col>


    </Row>

    <style jsx>{`@import "../static/search.css";`}</style>
  </div>
  )
}
Search.getInitialProps = async ({ ctx }) => {
  console.log('ctx---', ctx)
  const { query, sort, lang, order, page } = ctx.query
  if (!query) {
    return {
      repos: { total_count: 0 }
    }
  }
  let queryString = `?q=${query}`
  if (lang) queryString += `+language:${lang}`
  if (sort) queryString += `+&sort:${sort}&order=${order || 'desc'}`
  if (page) queryString += `&page:${page}`

  const res = await map_api.request({ url: `/search/repositories${queryString}` },
    ctx.req,
    ctx.res
  )

  return {
    repos: res.data
  }

}
export default withRouter(Search)