import App, { Container } from 'next/app'
import { Fragment } from 'react';
import { Provider } from "react-redux";

import { myContext } from '../lib/my-context';
import withRedux from '../lib/with-redux';
import Layout from "../components/Layout-1-6课";

// import store from '../store/newStore'
// import store from '../store/store'

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
    // const { Component } = this.props
    return (
      <Fragment>
        <Container>
          <Layout>

            {/* <Provider store={store}> */}
            <Provider store={reduxStore}>
              <myContext.Provider value="test">
                <Component {...pageProps} />
                {/* <Component /> */}
              </myContext.Provider>
            </Provider>


          </Layout>
        </Container>
      </Fragment>

    )
  }
}
export default withRedux(MyApp)
