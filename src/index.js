import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import './index.css'
import { createStore, compose, applyMiddleware } from 'redux'
import { HashRouter } from 'react-router-dom'
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import mtAlign from './reducers'
import App from './containers/App'

const history = createHistory()
let store = createStore(
  mtAlign(history),
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
    )
  )
)

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})

  const enhancer = composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
    )
  )
  store = createStore(mtAlign(history), enhancer)
}

const containerEl = document.getElementById('mtviewer')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  containerEl
)
