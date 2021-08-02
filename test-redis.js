const Redis = require('ioredis')
const redis = new Redis({
  port: 6380,
  password: 123
})

async function test(){

  await redis.set('c','傻逼公司')
  await redis.set('d','sb')
  const keys = await redis.keys('*')
  // console.log(await redis.get('c'))
}
test()