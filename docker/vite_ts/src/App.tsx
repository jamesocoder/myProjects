import { useEffect, useState } from 'react'
/* svg's can be imported with any arbitrary name.
You don't have to match the source file name */
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import swapLogo from './assets/swapB.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  /* Log entire contents of the environment Vite loads to the browser's console.
  All import.meta.env... references are replaced with hard-coded values during
  Vite's build process */
  useEffect(() => console.log(import.meta.env), []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <img src={swapLogo} className="logo" alt="dynamic logo" />
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Docker + Vite + React + TypeScript</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>{'import.meta.env.DEV variable is ' + (import.meta.env.DEV ? 'true' : 'falsey')}</p>
        <p>{import.meta.env.VITE_HOST ?? 'HOST ENV variable not readable'}</p>
        <p>{import.meta.env.VITE_PORT ?? 'PORT ENV variable not readable'}</p>
        <p>
          If <code>docker compose up --watch</code> was used, reload the browser after
          trying the following:
        </p>
        <ul>
          <li>
            Edit <code>src/App.tsx</code>'s return or change which "swap" asset is imported from
            &nbsp;<code>src/assets/</code> to test compose watch's <strong>sync</strong> action.
          </li>
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
