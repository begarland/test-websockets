import * as React from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import SimpleInput from '../SimpleInput/SimpleInput'

interface IUseWebSocketComponent {
  link: string
}

const UseWebSocketComponent: React.FC<IUseWebSocketComponent> = ({ link }) => {
  const [socketUrl, setSocketUrl] = React.useState<string>(link)

  const { sendJsonMessage, lastMessage, readyState, lastJsonMessage } =
    useWebSocket(socketUrl)

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  const sendMessageToSocket = React.useCallback(
    (message) => sendJsonMessage({ message: message }),
    []
  )

  return (
    <>
      <p>the socket is {connectionStatus}</p>
      <br />
      <br />
      <br />
      <SimpleInput callback={sendMessageToSocket} />
      <br />
      <br />
      <br />
      <p>the lastMessage received is {lastMessage?.data}</p>
      <p>the lastJsonMessage received is {JSON.stringify(lastJsonMessage)}</p>
    </>
  )
}

export default UseWebSocketComponent
