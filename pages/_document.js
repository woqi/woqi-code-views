import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'


function withLog(Comp) {
  return (props) => {

    return <Comp {...props} />
  }
}
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    const sheet = new ServerStyleSheet()

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
          // enhanceApp: App => withLog(App),//有定义的app就是_app.js中的app，没有就是next默认的app
          // enhanceComponent: Component => withLog(Component),//在pages文件下定义的每一个文件
        })
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps,
        styles:(<>
        {sheet.getStyleElement()}
        </>)
       }
    } finally {
      sheet.seal()
    }



  }

  render() {
    return (
      <Html>
        <Head>
        </Head >
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const originalRenderPage = ctx.renderPage

//     ctx.renderPage = () =>
//       originalRenderPage({
//         // useful for wrapping the whole react tree
//         enhanceApp: (App) => App,
//         // useful for wrapping in a per-page basis
//         enhanceComponent: (Component) => Component,
//       })

//     // Run the parent `getInitialProps`, it now includes the custom `renderPage`
//     const initialProps = await Document.getInitialProps(ctx)

//     return initialProps
//   }
// }
