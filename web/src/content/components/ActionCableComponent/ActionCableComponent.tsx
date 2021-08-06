import * as React from 'react'
import {
  ActionCableProvider,
  ActionCableConsumer,
} from 'react-actioncable-provider'
// import * as ActionCable from 'actioncable'

interface IActionCableComponent {
  link: string
}

const ActionCableComponent: React.FC<IActionCableComponent> = ({ link }) => {
  const [message, setMessage] = React.useState<string>('')
  const [isConnected, setIsConnected] = React.useState<boolean>(false)
  const [isDisconnected, setIsDisconnected] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false)
  const [isRejected, setisRejected] = React.useState<boolean>(false)

  //   const cable = ActionCable.createConsumer(link)

  return (
    <ActionCableProvider url={link}>
      <ActionCableConsumer
        channel='MessagesChannel'
        onReceived={(message) => setMessage(message)}
        onConnected={() => setIsConnected(true)}
        onInitialized={() => setIsInitialized(true)}
        onDisconnected={() => setIsDisconnected(true)}
        onRejected={() => setisRejected(true)}
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
