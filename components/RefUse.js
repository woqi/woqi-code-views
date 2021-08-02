import React, { Component, useEffect, useRef } from 'react'

class RefUse extends Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }
  componentDidMount() {
    // this.refs.abc //获取dom对象信息 已经被删除
    // this.ref.current//获取dom信息 
  }

  render() {
    return (
      <div>
        <span ref={this.ref}></span>
      </div>
    )
  }
}

export default function FncRefUse() {
  useEffect(() => {
    console.log('ref---', Ref)
  })
  const Ref = useRef()
  return (
    <>
      <span ref={Ref}>span</span>
    </>
  )
}
