const Redis = require('ioredis')
const redis = new Redis({
  port: 6380,
  password: 123
})

async function test(){
  const keys = await redis.keys('*')
  console.log(keys)
}
test()