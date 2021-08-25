import { Component } from "react"
import customizeStore from "../store/store"


const isServer = typeof window === 'undefined'
const __NEXT_REUDX_STORE__ = '__NEXT_REUDX_STORE__'

function get_Or_Create_Store(initialState) {
  if (isServer) {//服务端
    return customizeStore(initialState)
  }
  if (!window[__NEXT_REUDX_STORE__]) {
    window[__NEXT_REUDX_STORE__] = customizeStore(initialState)
  }
  return window[__NEXT_REUDX_STORE__]
}

// console.log('reduxStore------------', get_Or_Create_Store())

export default Comp => {

  class WithReduxApp extends Component {

    constructor(props) {
      super(props)
      this.reduxStore = get_Or_Create_Store(props.initialReduxState)
    }

    render() {
      const { Component, pageProps, ...rest } = this.props

      if (pageProps) {
        pageProps.hocTest = 'fuck you'
      }

      return <Comp
        Component={Component}
        pageProps={pageProps}
        {...rest}
        reduxStore={this.reduxStore}
      />
    }

  }

  WithReduxApp.getInitialProps = async ctx => {
    let reduxStore
    if(isServer){
        
      const { req } = ctx.ctx
      const session = req.session
      // session && session.userInfo
      if (session && session.userInfo) {
        reduxStore = get_Or_Create_Store({
          user:session.userInfo
        })
      }else{
        reduxStore = get_Or_Create_Store()
      }  

    }else{
      reduxStore = get_Or_Create_Store()
    }

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }



    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }
  return WithReduxApp

}
