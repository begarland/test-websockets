import * as React from 'react'

interface ISimpleInput {
  callback: (message: string) => void
}

const SimpleInput: React.FC<ISimpleInput> = ({ callback }) => {
  const [inputValue, setInputValue] = React.useState<string>('')

  return (
    <>
      <p>Press Enter to submit a message to the socket</p>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            callback(inputValue)
            setInputValue('')
          }
        }}
      />
    </>
  )
}

export default SimpleInput
