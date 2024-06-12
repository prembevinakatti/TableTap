import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginAndSignUp from './components/LoginAndSignUp/LoginAndSignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <LoginAndSignUp />
    </>
  )
}

export default App
