import * as React from 'react'
import {
  ActionCableProvider,
  ActionCableConsumer,
} from 'react-actioncable-provider'
import SimpleInput from '../SimpleInput/SimpleInput'

interface IActionCableComponent {
  link: string
}

const ActionCableComponent: React.FC<IActionCableComponent> = ({ link }) => {
  const [message, setMessage] = React.useState<string>('')
  const [isConnected, setIsConnected] = React.useState<boolean>(false)
  const [isDisconnected, setIsDisconnected] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
  const [isRejected, setisRejected] = React.useState<boolean>(false)
  const actionCable = React.useRef()

  function handleMessage(message) {
    console.log('message is', message)
    setMessage(JSON.stringify(message))
  }

  function sendMessage(message) {
    ;(actionCable as any).current.perform('send_message', { message })
  }

  return (
    <ActionCableProvider url={link}>
      <ActionCableConsumer
        channel='MessagesChannel'
        onReceived={handleMessage}
        onConnected={() => setIsConnected(true)}
        onInitialized={() => setIsInitialized(true)}
        onDisconnected={() => setIsDisconnected(true)}
        onRejected={() => setisRejected(true)}
        ref={actionCable}
      >
        <p>{isInitialized ? 'Initialized' : 'Initializing'}</p>
        <p>
          {isDisconnected
            ? 'Disconnected'
            : isConnected
            ? 'Connected'
            : 'Not Connected'}
        </p>
        <p>{isRejected && 'Rejected'}</p>
        <SimpleInput callback={sendMessage} />
        <br />
        <br />
        <br />
        <br />
        <p>{message}</p>
      </ActionCableConsumer>
    </ActionCableProvider>
  )
}

export default ActionCableComponent
