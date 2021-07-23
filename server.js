const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV != 'producction'
const app = next({ dev })//开发状态
const handle = app.getRequestHandler()
// app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  router.get('/test', (ctx, next) => {
    ctx.body = {success:true}
    ctx.set('Content-Type','application/json')
   })
  server.use(async (ctx, next) => {
    await next()
  })
  server.use(router.routes())
  server.listen(3030, () => {
    console.log('成功')
  })
// })

