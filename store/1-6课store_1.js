import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const initState = {
  count: 0,
  testText,
}

const initTest = {
  username: 'woqi'
}

const ADD = 'ADD'
const UPDATE = 'UPDATE'
const TEST = 'TEST'


function countReducer(state = initState, action) {
  // console.log('state---action', state, action)
  switch (action.type) {
    case ADD:
      return { count: state.count + (1 || action.num) }//return 的一定是一个新对象
    case TEST:
      return { testText: `store得到传入的数据${action.con}` }
    default:
      return state
  }
}

function testReducer(state = initTest, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state, username: action.name, age: action.age
      }
    default:
      return state
  }
}


const allReducers = combineReducers({
  counter: countReducer,
  test: testReducer
})


const store = createStore(
  allReducers,
  {
    counter: initState,
    test: initTest
  },
  composeWithDevTools(applyMiddleware(ReduxThunk))
)

function handleAdd(num) {
  return { type: ADD, num }
}

function addAsync(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: ADD, num })
    }, 1000)
  }
}

// console.log('store', store,store.getState())
// store.dispatch({ type: ADD })
// console.log('store变更后', store.getState())
store.subscribe(() => {
  console.log('sub中的state', store.getState())
})
// store.dispatch({ type: ADD })
// store.dispatch(addAsync(5))
// store.dispatch({ type: UPDATE, name: 'haha', age: 6 })


export default store