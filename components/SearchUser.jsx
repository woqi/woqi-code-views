import { Select, Spin } from 'antd'
import { useState, useRef } from 'react'
import debounce from 'lodash/debounce'

import map_api from '../lib/map-api'

const { Option } = Select

export default function SearchUser({ onChange, data }) {
  const lastFetchIdRef = useRef(0)
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  const fetchUser = debounce(value => {
    console.log('fetchUser', value)
    lastFetchIdRef.current += 1
    const fetchId = lastFetchIdRef.current
    setFetching(true)
    setOptions([])
    map_api
      .request({
        url: `/search/users?q=${value}`,
      })
      .then(resp => {
        console.log('/search/users', resp)
        if (fetchId != lastFetchIdRef.current) {
          return
        }
        const data = resp.data.items.map(user => ({
          text: user.login,
          value: user.login,
        }))

        setFetching(false)
        setOptions(data)
      })
  }, 500)
  const handleChange = value => {
    setFetching(false)
    setOptions([])
    onChange(value)
  }

  return (
    <div>
      <Select
        value={data}
        style={{ width: 200 }}
        showSearch={true}
        onChange={handleChange}
        notFoundContent={
          fetching ? <Spin size='small' /> : <span>nothing</span>
        }
        filterOption={false} //关闭本地的option
        placeholder='创建者'
        allowClear={true}
        onSearch={fetchUser}
      >
        {options.map(op => (
          <Option value={op.value} key={op.value}>
            {op.text}
          </Option>
        ))}
      </Select>
    </div>
  )
}
