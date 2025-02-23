import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  /* Log entire contents of the environment Vite loads to the browser's
  console */
  console.log(import.meta.env)

  /* All import.meta.env... references are replaced with hard-coded values
  during Vite's build process */
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>{'import.meta.env.DEV variable is ' + (import.meta.env.DEV ? 'true' : 'falsey')}</p>
        <p>{import.meta.env.VITE_HOST ?? 'HOST ENV variable not readable'}</p>
        <p>{import.meta.env.VITE_PORT ?? 'PORT ENV variable not readable'}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
