import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Login} from './components/authComp';

function App() {
  /* Record frontend's address
  import.meta.env.VITE_ADDR = (() => {
    let serverAddr = import.meta.env.DEV ? "http" : "https";
    serverAddr += `://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
    return serverAddr;
  })(); */

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    }
  ]);

  return (
    <>
      <RouterProvider
        router = {router}
        fallbackElement={<div>LOADING...</div>}
      />

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Vite + React + Redux</p>
    </>
  )
}

export default App
