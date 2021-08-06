import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { combineEpics } from 'redux-observable'
import appState from './appReducer'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    appState,
  })

export const rootEpic = combineEpics()
