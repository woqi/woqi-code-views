import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from "axios";


const initUser = {}

const LOGOUT = 'logOut'
function userReducer(state = initUser, action) {
  switch (action.type) {
    case LOGOUT: {
      return { }
    }
    default:
      return state
  }
}

const allReducers = combineReducers({
  user: userReducer
})

export function logOut() {
  return dispatch => {
    axios.post('/logout').then(res => {
      if (res.status === 200) {
        dispatch({ type: LOGOUT })
      } else {
        console.log('logout failed', res)
      }
    }).catch(err => console.log('失败', err))
  }
}


export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign(
      {},
      {
        user: initUser,
      },
      state
    ),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}

