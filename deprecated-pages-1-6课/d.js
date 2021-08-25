import {
  useEffect, useState,
  useReducer, useMemo, Component,
  useCallback,
  memo
} from "react"

function c1Reducer(state, action) {
  switch (action.type) {
    case 'add':
      return {count: state.count + 1}
    case 'minus':
      return state - 1
    case 'test':
      return state = 'chishi'
    case 'closure':
      return state.count
    default: return state
  }
}

function d() {
  const [state, setState] = useState(1);

  const [count, dispatchc1] = useReducer(c1Reducer, 0)

  const [t, dispatchT] = useReducer(c1Reducer, '初始')

  const [name, setName] = useState('请输入姓名')

  const config = useMemo(() => (
    {
      text: `count is${count}`,
      color: count > 3 ? 'red' : 'blue'
    }
  ), [count])

  //以下用法相同
  const handleButtonClick = useMemo(() => () => {
    return dispatchc1({ type: 'add' })
  }, [])
  const handleButtonClick1 = useCallback(() => dispatchc1({ type: 'add' }), [])

  const closure = () => {
    setTimeout(() => { console.log('count---', count) }, 3000)
  }

  return (
    <>
      页面d
      <br />
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <br />
      <br />

      {/* <Con config={config}
        onButtonClick={handleButtonClick1}
      /> */}

      <Child config={config}
        onButtonClick={handleButtonClick}
      />
      <br />
      <br />
      <button onClick={closure}>闭包测试</button>

      <br />
      <button onClick={() => {
        setState(x => x + x);
      }}>测试useCallback</button>


      <br />
      <br />
      <div>state:{state}</div>
      <FunctionProfilePage user={state} />
      <ClassProfilePage user={state} />

      <br />
      <div onClick={() => dispatchT({ type: 'test' })}>断保护----{t}</div>
      <br />


    </>
  )
}
export default d

const Child = memo(
  function cc({ onButtonClick, config }) {
    // console.log('Child执行')
    return (<>
      <button onClick={onButtonClick} style={{ color: config.color }}>
        Child--{config.text}
      </button>
    </>)
  }
)
function Con({ onButtonClick, config }) {
  console.log('Con执行')
  return (<>
    <button onClick={onButtonClick} style={{ color: config.color }}>
      Con--{config.text}
    </button>
  </>)
}

class ClassProfilePage extends Component {
  showMessage = () => {
    alert('ClassProfilePage_Followed ' + this.props.user);
  };
  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };
  render() {
    return <button onClick={this.handleClick}>Class_Follow</button>;
  }
}

function FunctionProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };
  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Function_Follow</button>
  );
}

// for(var i=0;i<10;i++){
//   setTimeout(() => console.log('拿到的是最新值val:',i)) // 拿到的是最新值
// }
// for(var i=0;i<10;i++){
//   setTimeout(((val) => console.log('拿到的是快照val:',val)).bind(null,i)); // 拿到的是快照
// }