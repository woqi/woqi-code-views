import { combineReducers, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { ADD, UPDATE, TEST } from "./dispatch/dispatch_type";

const initState = {
  count: 0,
  testText: '',
}

const initTest = {
  username: 'woqi'
}

function countReducer(state = initState, action) {
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

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        counter: initState,
        test: initTest,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}

