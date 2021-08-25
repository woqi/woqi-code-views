export default (Comp) => {
  function TestHocComp({ Compoent, pageProps, ...rest }) {//TestHocComp代替Comp去使用
    console.log('Compoent', Compoent)
    if (pageProps) {
      console.log('pageProps-----------', pageProps)
      pageProps.hocTest = 'fuck you'

    }
    return <Comp Compoent={Compoent} pageProps={pageProps} {...rest} />
  }
  TestHocComp.getInitialProps = Comp.getInitialProps
  return TestHocComp
}