import App, { Container } from 'next/app'

import Link from 'next/router'
import { Fragment } from 'react';

import Layout from "../components/Layout";

import { myContext } from '../lib/my-context';

class MyApp extends App {
  // static async getInitialProps({ Component }) {

  //   let pageProps
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps()
  //   }
  //   return { pageProps }
  // }

  render() {
    // const { Component, pageProps } = this.props
    const { Component } = this.props
    return (
      <Fragment>
        <Container>
          <Layout>

            <myContext.Provider value="test">
              {/* <Component {...pageProps} /> */}
              <Component />


            </myContext.Provider>

          </Layout>
        </Container>
      </Fragment>

    )
  }
}
export default MyApp
