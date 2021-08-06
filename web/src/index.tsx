import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import history from './redux/store/history'
import { ConnectedRouter } from 'connected-react-router'
import { Route } from 'react-router'
import 'date-input-polyfill'
import App from './content/App'

ReactDOM.render(
  <Provider store={store as any}>
    <ConnectedRouter history={history}>
      <Route path='/' component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
