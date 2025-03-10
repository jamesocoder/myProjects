import './App.css'
import { useEffect, useState } from 'react'
import { Environment, Header, Instructions, Secret } from './components';
// Change which logo is imported here to see Watch and HMR
import { swapB as swapLogo } from './assets';

export default function App() {
  const [count, setCount] = useState(0);

  /* Log entire contents of the environment Vite loads to the browser's console.
  All import.meta.env... references are replaced with hard-coded values during
  Vite's build process */
  useEffect(() => console.log(import.meta.env), []);

  return <>
    <Header swapLogo={swapLogo} />
    <Environment />
    <Secret />
    <Instructions />
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  </>
}