import { Icon, Button } from "antd";
import { Fragment, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import getConfig from 'next/config'

import { connect } from "react-redux";

import { handleAdd } from "../store/dispatch/a_dispatch";

const { publicRuntimeConfig } = getConfig()

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
    // console.log('类型：', type, '参数：', ...args)
  }
}
handleEvents.forEach(e => {
  Router.events.on(e, makeEvent(e))
})

const Index = (props) => {
  // console.log('props---', props)
  // let storeCount = store.subscribe(() => {
  //   return store.getState().counter.count
  // })

  function goBpage() {
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    })
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/user/info'
    }).then(res => console.log('hout----', res))
  }, [])

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
      <br></br>
      <br></br>
      {/* <p>store中counter--{props.counter}</p> */}
      {/* <input value={props.testName} onChange={e => props.storeReName(e.target.value)}></input> */}
      <br />
      <button onClick={() => props.storeAdd(0)}>加store中counter</button>
      <br />
      <a href={publicRuntimeConfig.OAUTH_URL}>去github登陆</a>

    </Fragment>
  )
}

Index.getInitialProps = async (p) => {
  // console.log('-----！！！！！！！！！！！！！！！！！---------', '吃屎')
  // console.log('-----！！！！！！！！！！！！！！！！！---------', p.reduxStore)
  // const { dispatch } = p.reduxStore
  p.reduxStore.dispatch(handleAdd(8))
  return {}
}

function mapStateToProps(state) {
  return state
  // return {
  //   counter: state.counter.count,
  //   testName: state.test.username
  // }
}
function mapDispatchToProps(dispatch) {
  return {
    storeAdd: (num) => dispatch({ type: 'ADD', num }),
    storeReName: (name) => dispatch({ type: 'UPDATE', name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)

// 类型： routeChangeStart 参数： /c
// 类型： beforeHistoryChange 参数： /c
// 类型： routeChangeComplete 参数： /c

// 类型： hashChangeStart 参数： /c#ccccdddd
// 类型： hashChangeComplete 参数： /c#ccccdddd