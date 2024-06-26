import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  createBrowserRouter,
  redirect,
  RouterProvider
} from 'react-router-dom';

import {GetAuth, SaveToken} from './components/authorization';

function App() {
  const backend = import.meta.env.VITE_BACKEND;

  let serverAddr = import.meta.env.DEV ? "http" : "https";
  serverAddr += `://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`;
  
  const AUTH_ENDPOINT = '/token-get';
  const authUrl = serverAddr + AUTH_ENDPOINT;

  const router = createBrowserRouter([
    {
      path: '/',
      loader: () => {
        return redirect(`${backend}/authorize?redirect=${authUrl}`)
      },
      element: <GetAuth />
    },
    {
      path: AUTH_ENDPOINT,
      loader: async ({request}: {request: Request}) => {
        const url = new URL(request.url);
        if (url.searchParams.has('code')) {
          let apiParams = new URLSearchParams({
            AuthCode: url.searchParams.get('code') as string,
            redirect: authUrl
          });
          const data = await fetch(`${backend}/token-get?${apiParams.toString()}`);
          return data;
        } else { return null; }
      },
      element: <SaveToken />,
      errorElement: <GetAuth />
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
