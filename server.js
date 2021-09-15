const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')


const RedisSessionStore = require('./server/session-store')
const auth = require('./server/auth')
const api = require('./server/api')


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
  
  server.use(koaBody())
  //设置
  server.keys = ['lsdlsd']//加密
  const SESSION_CONFIG = {
    key: 'wid',//设置到浏览器中的cookie 键名
    // maxAge: 10 * 1000,
    store: new RedisSessionStore(redis) //没有数据库就会都存储在cookies里
  }

  server.use(session(SESSION_CONFIG, server))
  auth(server)//处理github oAuth登陆
  api(server)

  router.get('/a/:id', async (ctx, next) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })

    ctx.respond = false

  })

  router.get('/api/user/info', async (ctx, next) => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {

      console.log('session!!!!!!!!!!!!!!!!!!!!!!!!!------------', ctx.session)
      ctx.body = ctx.session.userInfo
      ctx.set('Content-Type', 'application/json')//set是专门设置header的
    }

  })


  server.use(router.routes())

  server.use(async (ctx, next) => {
    count += 1
    ctx.cookies.set('wq', count, {
      httpOnly: false
    })

    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)//handle处理所有res
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200

    await next()

  })



  server.listen(3030, () => {
    console.log('Listen on: http://localhost:3030')
  })

})



