function getRedisSessionId(s_id) {
  return `ssid:${s_id}`
}

 class RedisSessionStore {
  constructor(client) {
    this.client = client
  }
  //获取redis中存储的session数据
  async get(s_id) {
    console.log('get session', s_id)
    const id = getRedisSessionId(s_id)
    const data = await this.client.get(id)//redis = this.client 的get方法
    if (!data) {
      return null
    }
    try {
      console.log('get session-----------------',data)
      const result = JSON.parse(data)
      return result
    } catch (err) {
      console.log('err---', err)
    }

  }

  //存储session数据到redis
  async set(s_id, sess, ttl) {//ttl，时间期限
    console.log('set session', s_id)

    const id = getRedisSessionId(s_id)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)//设置到数据库存入秒
    }

    try {
      const sessStr = JSON.stringify(sess)//value
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }

    } catch (err) {
      console.log('err---', err)
    }


  }

  //从redis中删除某个session
  async destroy(s_id) {
    console.log('destroy session', s_id)

    const id = getRedisSessionId(s_id)
    await this.client.del(id)


  }
}

module.exports = RedisSessionStore