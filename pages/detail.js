function Detail() {
  return (
    <span>~~page Detail~~</span>
  )
}
Detail.getInitialProps = () => {
  return new Promise(resolve => {
    setTimeout(() => { resolve('jiazai') }, 1000)
  })
}

export default Detail