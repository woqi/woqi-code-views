const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')


const RedisSessionStore = require('./server/session-store')
const auth = require('./server/auth')

const dev = process.env.NODE_ENV != 'producction'
const app = next({ dev })//开发状态
const handle = app.getRequestHandler()
const redis = new Redis({//创建redis client
  port: '6380',
  password: '123'
})

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  let count = 0

  //设置
  server.keys = ['lsdlsd']//加密
  const SESSION_CONFIG = {
    key: 'wid',//设置到浏览器中的cookie 键名
    // maxAge: 10 * 1000,
    store: new RedisSessionStore(redis) //没有数据库就会都存储在cookies里
  }

  server.use(session(SESSION_CONFIG, server))
  auth(server)//处理github oAuth登陆

  //以下配置会造成报错
  // server.use((ctx, next) => {
  //   if (ctx.cookies.get('wid')) {
  //     ctx.session = {}
  //   }
  //   await next()
  //   //通过ctx.cookies.set设置cookie
  //   //已经发送了请求，再去设置cookie已经没有用了
  // })

  server.use(async (ctx, next) => {
    //   ctx.respond = false
    //   // console.log('cookies---------', ctx.cookies.get('wq'))
    //   // //获取用户数据
    //   // //比如调用`model.getUserById(id)`
    // ctx.session = ctx.session || {}
    //   // ctx.session.user = {
    //   //   name: 'woqi', age: '18'
    //   // }

    //   if (!ctx.session.user) {
    //     ctx.session.user = { name: 'woqi', age: '18' }
    //   } else {
    // console.log('session is------', ctx.session)
    //   }


    await next()
  })



  router.get('/a/:id', async (ctx, next) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })

    ctx.respond = false

  })

  router.get('/set/user', async (ctx, next) => {
    // ctx.respond = false
    ctx.session.user = {
      name: 'woqi', age: '18'
    }
    //此处不处理handle
    ctx.body = 'set session success'
  })

  router.get('/delete/session', async (ctx, next) => {
    ctx.session = null
    ctx.body = 'set session success~~'
  })



  server.use(router.routes())

  server.use(async (ctx, next) => {
    count += 1
    ctx.cookies.set('wq', count, {
      httpOnly: false
    })


    await handle(ctx.req, ctx.res)//handle处理所有res
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200

    await next()

  })





  server.listen(3030, () => {
    console.log('成功') 
  })

})

