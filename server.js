const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_ENV != 'producction'
const app = next({ dev })//开发状态
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/a/:id', async (ctx, next) => {
    const id = ctx.params.id

    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: { id }
    })

    ctx.respond = false

  })

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(router.routes())
  server.listen(3030, () => {
    console.log('成功')
  })

})

