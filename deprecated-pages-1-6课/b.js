import {
  Component, Fragment, useEffect, useState,
  useReducer, useContext
} from "react"

import { myContext } from "../lib/my-context"

//拿到路由信息next的
import { withRouter } from "next/router"

import FncRefUse from "../components/RefUse"


class B extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000)
  }
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
  render() {
    // console.log('b---', this.props)
    let { router } = this.props
    let { count } = this.state
    return (
      <>
        页面b--{router.query.id}
        <div>{count}</div>

      </>
    )
  }

}

function c1Reducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default: return state
  }
}


function bb(props) {
  const [count, setCount] = useState(0)
  const [c1, dispatchc1] = useReducer(c1Reducer, 0)
  const [name, setName] = useState('请输入姓名')

  const ctx = useContext(myContext)
  let interval = () => {
    setInterval(() => {
      setCount(c => c + 1)
      dispatchc1({ type: 'add' })
    }, 1000)
  }

  useEffect(() => {
console.log('!!!----',ctx)
    // interval()

    // return () => clearInterval(interval)
  }, [])

  return (
    <>
      页面b--{props.router.query.id}
      <div>useEffect----{count}</div>
      <div>useReducer----{c1}</div>

      <Con count={count} c1={c1}></Con>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <span></span>
      <FncRefUse></FncRefUse>
    </>
  )
}

export default withRouter(bb)


function Con(props) {
  return <>
    <div>子组件接收父组件的count----{props.count}</div>
    <div>子组件接收父组件的c1----{props.c1}</div>
  </>
}