import * as React from 'react'
import ActionCableComponent from './components/ActionCableComponent/ActionCableComponent'

import UseWebSocketComponent from './components/UseWebSocketComponent/UseWebSocketComponent'

const App = () => {
  const socketLink = 'wss://action-cable-example.herokuapp.com/cable'
  // 'wss://echo.websocket.org'

  const [socketPackage, setSocketPackage] = React.useState<
    'useWebSocket' | 'actioncable'
  >('useWebSocket')

  return (
    <div className='App'>
      <div className='App-splash-logo'>
        <p>The socket url is: {socketLink}</p>
        <button
          onClick={() =>
            setSocketPackage(
              socketPackage === 'useWebSocket' ? 'actioncable' : 'useWebSocket'
            )
          }
        >
          switch to{' '}
          {socketPackage === 'useWebSocket' ? 'actioncable' : 'useWebSocket'}
        </button>
        <hr />
        {socketPackage === 'useWebSocket' && (
          <UseWebSocketComponent link={socketLink} />
        )}
        {socketPackage === 'actioncable' && (
          <ActionCableComponent link={socketLink} />
        )}
      </div>
    </div>
  )
}

export default App
