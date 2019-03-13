import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import {RECEIVE_RESOURCE, REQUEST_RESOURCE, SELECT_LINK, CLEAR_TOSEFTA_CHAPTER} from '../actions'

function reduceResource(state = {}, action) {
  let newState = {}
  switch (action.type) {
    case REQUEST_RESOURCE:
      newState = {}
      newState[action.docType] = { isFetching: true }
      return Object.assign({}, state, newState)
    case RECEIVE_RESOURCE:
      newState = {}
      const data = {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt
      }
      if (action.chapter) {
        data.chapter = action.chapter
      }
      newState[action.docType] = data
      return Object.assign({}, state, newState)
    case SELECT_LINK:
      newState = Object.assign({}, state)
      newState.alignment.data = newState.alignment.data.map((l, i) => {
        if (i === action.idx) {
          l.selected = true
        } else {
          l.selected = false
        }
        return l
      })
      return newState
    case CLEAR_TOSEFTA_CHAPTER:
      if (state.toseftaChapter) {
        newState = Object.assign({}, state)
        delete newState.toseftaChapter
        return newState
      }
      return state
    default:
      return state
  }
}

function resources(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESOURCE:
    case REQUEST_RESOURCE:
    case SELECT_LINK:
    case CLEAR_TOSEFTA_CHAPTER:
      return Object.assign({},
        reduceResource(state, action)
      )
    default:
      return state
  }
}

export default (history) => combineReducers({
  resources,
  router: connectRouter(history)
})