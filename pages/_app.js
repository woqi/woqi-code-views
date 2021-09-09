import App, { Container } from 'next/app'
import { Provider } from "react-redux"
import Router from "next/router"
import Link from "next/link"

import withRedux from '../lib/with-redux'
import Layout from "../components/Layout"
import PageLoading from "../components/PageLoading"
import axios from 'axios'
class MyApp extends App {
  state = { loading: false }

  startLoading = () => {
    this.setState({ loading: true })
  }
  stopLoading = () => {
    this.setState({ loading: false })
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)

  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  static async getInitialProps(ctx) {
    // console.log('---------------------------app init--------------')
    // console.log('----ctxctxctxctxctxctx----', ctx)
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>

        <Provider store={reduxStore}>
          {this.state.loading ? <PageLoading /> : null}
          <Layout>

            {pageProps ? <Component {...pageProps} /> : <Component />}
            {/* <Component {...pageProps} /> */}
          </Layout>

        </Provider>

        <style jsx >{`
          @import'../static/antd.css'; 
          @import'../static/base-css.css'; 
      `}
      </style>
      </Container>


    )
  }
}
export default withRedux(MyApp)
