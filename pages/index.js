import { Icon, Button } from "antd";
import { Fragment } from "react";
import Link from "next/link";
import Router from "next/router";

const handleEvents = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]
function makeEvent(type) {
  return (...args) => {
    console.log('类型：', type, '参数：', ...args)
  }
}
handleEvents.forEach(e => {
  Router.events.on(e, makeEvent(e))
})

export default () => {
  function goBpage() {
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    })
  }
  return (
    <Fragment>
      <Icon type="smile" rotate={180} />
      dakouchishi
      <br></br>
      <Link href="/a">
        {/* 映射路由 */}
        {/* <Link href="/a" as='loveme'> */}
        <Button>去a页</Button>
      </Link>
      <br></br>
      <Button onClick={goBpage}>去b页</Button>
      <br></br>
      <Link href="/c">
        <Button>去c页</Button>
      </Link>

    </Fragment>
  )
}


// 类型： routeChangeStart 参数： /c
// 类型： beforeHistoryChange 参数： /c
// 类型： routeChangeComplete 参数： /c

// 类型： hashChangeStart 参数： /c#ccccdddd
// 类型： hashChangeComplete 参数： /c#ccccdddd