import './App.css'
import { useEffect, useState } from 'react'
import { Environment, Header, Instructions, Secret } from './components';
import { swapB as swapLogo } from './assets'; // Change which logo is imported here to demo Watch and HMR

export default function App() {
  const [count, setCount] = useState(0);

  /* Log entire contents of the environment Vite loads to the browser's console.
  All import.meta.env... references are replaced with hard-coded values during
  Vite's build process */
  useEffect(() => console.log(import.meta.env), []);

  return (
    <>
      <Header swapLogo={swapLogo} />
      <Environment />
      <Secret />
      <Instructions />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}