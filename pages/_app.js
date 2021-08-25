import App, { Container } from 'next/app'
import { Fragment } from 'react';
import { Provider } from "react-redux";


import withRedux from '../lib/with-redux';
import Layout from "../components/Layout";


class MyApp extends App {

  static async getInitialProps(ctx) {
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

          <Layout>
            <Component {...pageProps} />
          </Layout>

        </Provider>


        {/* @import'../static/a.css'; */}
        {/* @import'antd/dist/antd.css'; */}
        {/* // @import'../static/antd.css'; */}
        <style jsx >{`
          @import'../static/antd.css'; 
      `}</style>
      </Container>


    )
  }
}
export default withRedux(MyApp)
