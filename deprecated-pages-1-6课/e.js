import {
  useReducer, useMemo,
  memo, useRef
} from "react"

function c1Reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 }
    case 'minus':
      return state - 1
    case 'closure':
      return { ...state, qq: state.count }
    default: return state
  }
}

function d() {
  const [count, dispatchc1] = useReducer(c1Reducer, { count: 0 })
  const countRef = useRef()
  countRef.current = count
  const config = useMemo(() => (
    {
      text: `count is${count.count}`,
      color: count.count > 3 ? 'red' : 'blue'
    }
  ), [count.count])

  const handleButtonClick = useMemo(() => () => {
    return dispatchc1({ type: 'add' })
  }, [])

  const closure = () => {
    setTimeout(() => {
      console.log('nowCount---', countRef.current)
    }, 3000)
  }

  return (
    <>
      页面
      <Child config={config}
        onButtonClick={handleButtonClick}
      />

      <button onClick={closure}>闭包测试</button>
      <br />

    </>
  )
}
export default d

const Child = memo(
  function cc({ onButtonClick, config }) {
    // console.log('Child执行', config)
    return (<>
      <button onClick={onButtonClick} style={{ color: config.color }}>
        Child--{config.text}
      </button>
    </>)
  }
)




