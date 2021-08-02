# woqi-cover-GitHUb

page 所有的文件都对应一个页面

koa 做 server 的原因就是 next 在映射路由的时候回退是无法回退到映射的路由的，koa 可以做到

享受 next ssr 需要符合它的数据获取规范

pages 下的文件才能使用 getInitialProps
8.0 版本 getInitialProps，服务端客户端都会执行
服务端执行了客户端不会执行

```
A.getInitialProps = async () => {
  console.log('object--------------------')
  const promise = new Promise((resolve,reject)=>{
    setTimeout(() => {
      return resolve(256)
    }, 3000);
  })
  return { name: await promise }//return的东西都会被传入A的props
}
```

这段代码 数据到来了 才能去 a 页面，当前在 a 页面需要等 3 秒才有数据

有时候需要你先渲染一部分的数据再去得到 getInitialProps 的数据，此时发生的卡顿是一个缺陷

9.3 以上的版本推荐 getStaticProps 或 getServerSideProps
getServerSideProps 里不要用 fetch 调路由
他俩只在 pages 里使用、只在服务器上运行
getStaticProps 可以查数据库

自定义 app 作用
固定页面布局
保持公用状态 redux
具体页面传入自定义数据
自定义错误处理

自定义 Document 和自定义 app 差不多，需要引入一些 Document 的标签，配合 css-in-js 使用

```
const A = () => {
  return (
    <Fragment>
      页面aaa
      <div className="name">//////4444</div>
      <style jsx>{`
          @import'../static/a.css'
      `}</style>
    </Fragment>
  )
}//此处组件间样式隔离的


<style jsx global>{`
    @import'../static/a.css'
`}</style>
//组件卸载后写在当前组件的global样式失效
```

style jsx 这种 css 是 next.js 默认集成的 css-in-js 方案，自动做好了服务端的渲染，服务端就已经有了页面样式，不会发生屏闪

next 可以异步加载模块和组件，这是两种状态

在 8.0 这个版本，重构尽量把请求放在 getInitialProps 中,next会更好的处理数据同步的问题


useLayoutEffect 和 useEffect 区别

useLayoutEffect 的更新是在真实dom更新之前执行，里面放入需要大量时间的代码，导致页面卡顿
useEffect 的更新是在真实dom更新之后执行

memo只检查props变更，其余的不检查

useCallback
