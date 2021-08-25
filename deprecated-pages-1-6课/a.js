
import { Fragment } from "react"
import { withRouter } from "next/router"
import Comp from "../components/Comp"
import styled from "styled-components";
// import moment from "moment";
import dynamic from 'next/dynamic'

let Title = styled.h1`
color:yellow;`


const DynamicCom = dynamic(
  () => import('../components/Dynamic'),
  { loading: () => <p>Loading caused by client page transition ...</p> }
)

const A = ({ router, name, time }) => {

  return (
    <Fragment>
      页面aaa
      路由信息---{router.query.id}
      <br />
      getInitialProps获取---{name}
      <div className="name">divn内容//////4444</div>

      <Comp name="A页面信息" />
      <DynamicCom />

      <Title>title---{time}</Title>
      <h1>The value of customKey is: {process.env.customKey}</h1>
      
      <style jsx global>{`
          @import'../static/a.css'
      `}</style> 
    </Fragment>
  )
}

A.getInitialProps = async () => {
  const moment = await import('moment')//懒加载模块
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'promise256',
        time: moment.default(Date.now() - 60 * 1000).fromNow()//一分钟前的
      })
    });
  })
  return await promise //return的东西都会被传入A的props
}


export default withRouter(A)

