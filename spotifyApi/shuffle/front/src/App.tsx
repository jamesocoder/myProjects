import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppDispatch, initAddr } from './state';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, TopArtists } from './components';

function App() {
  useAppDispatch()(initAddr());

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    }, {
      path: '/myTop5',
      element: <TopArtists />
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
