# woqi-cover-GitHUb

page 所有的文件都对应一个页面

koa 做 server 的原因就是 next 在映射路由的时候回退是无法回退到映射的路由的，koa 可以做到

享受 next ssr 需要符合它的数据获取规范

pages 下的文件才能使用 getInitialProps
8.0 版本 getInitialProps，服务端客户端都会执行
服务端执行了客户端不会执行

```
A.getInitialProps = async () => {
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

在 8.0 这个版本，重构尽量把请求放在 getInitialProps 中,next 会更好的处理数据同步的问题

useLayoutEffect 和 useEffect 区别

useLayoutEffect 的更新是在真实 dom 更新之前执行，里面放入需要大量时间的代码，导致页面卡顿
useEffect 的更新是在真实 dom 更新之后执行

memo 只检查 props 变更，其余的不检查

由于 class 组件有 this 可以规避掉很多闭包问题
function 组件(例子在 e.js 文件)很多时候只能拿到快照
解决闭包目前有两种思路
useRef 、useReduce

```
function reducer(state = initState, action) {
  console.log('state---action', state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 }//return 的一定是一个新对象 prevState != newState //true
      state.count +=1
      return state//prevState != newState //false，推荐这种用法
    default:
      return state
  }
}

```

hoc 接收组件作为参数并返回新的组件

OAuth 认证授权介绍
是一种行业标准授权的方式

客户端和服务端可以合并成为被授权方

对密码存储加密，在数据库中
常见为 https 加密，密钥服务器方才有

OAuth 接入后会从微信这种拿到一个 token 会有头像用户名等信息
授权不一定要先认证

多重授权方式：
Authorization Code：多用于浏览器 //常用
Refresh Token：通过 Authorization Code 拿到的 token 去换取一个新的 token，原因是之前给的 token 要过期了，相当于一个延期。
Device Code：主要针对于 tv
PassWord:被授权方获取授权方的用户名及密码，多用于内网
Implicit：被淘汰
Client Creadentials:客户端使用

Authorization Code 流程：
客户端在网页上发起 redirect 携带 client_id(github 使用第三方登陆)
认证成功后 github 给一个 redirect url，url 中 code，传递给服务器，
服务器 使用 code + secret 给 github 发请求，获取 token，将两者（服务器&github）交互

token：会携带一些权限信息
client_id：让用户知道现在是给哪一个客户端授权

[github OAuth 设置网址](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-apphttps://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

http://localhost:3030/auth?code=bfffa23c01ca2015c3f4

access_token=ghu_uDNaNKybHBt4p3iADPgTbwnssHbwCj348W1C&expires_in=28800&refresh_token=ghr_yhsw9sg6LtTO8x4GGBNcLgXv5UI59quSC43DhJ38hzCGbRnitlvsrIkx7eIzSM0ATL4NgO0jOFER&refresh_token_expires_in=15897600&scope=&token_type=bearer

{
"client_id":"Iv1.7bce592037053839",
"client_secret":"bc8ddb7e43dbe07b2473fb6074433b3b2cfe29ff",
"code":"476f9e6dede984558134"
}

https://github.com/login/oauth/authorize?client_id=Iv1.7bce592037053839&&scope=repo

oauth 通过一次性 code、id+secret(在服务器上)、redirect_url 保证安全

cookie 储存在客户端，每次发请求都会携带

| 日期 | 投入   | osk | fs     | tp 显示资产 |
| ---- | ------ | --- | ------ | ----------- |
| 8.9  | 300 ￥ | 23$ | 78$    | 45.72$      |
| 8.12 | 400 ￥ | 25$ | 90.14$ | 107.18$     |

https://api.github.com/users/woqi/repos

/user/starred

| name | 2021.8.22 | 2021.9.1 |
| ---- | --------- | -------- |
| wzry | 14.12     | 44.75    |
| tkb  | 0.49      | 3.18     |
| hjt  | 7.31      | 29.37    |
| gs   | 1.42      | 1.54     |
| hxb  | 187.65    | 729      |

tkb 7 12.46

lru-cache 根据时间缓存

[github api doc 网址](https://docs.github.com/en/rest/reference/users)

https://docs.github.com/en/rest/reference/activity#list-repositories-starred-by-the-authenticated-user

https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps

币安转 bsc 手续费
0.0005bnb
0.8usdt


## hoc组件要点 将自己要使用的参数留下，剩余参数放入组件


@import 'github-markdown-css/github-markdown.css当前版本已经被修改为npm install --global generate-github-markdown-css

`const MDRender = dynamic(() => import('../../components/MarkdownRender'))` 打包出来的文件其实大小没有变 把Markdown-it变成了一个请求，但是实际意义是异步加载该组件，Markdown-it包得以长缓存，detail文件改变不会导致Markdown-it包的url
