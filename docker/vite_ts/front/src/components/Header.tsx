import { reactLogo, viteLogo } from "../assets"

export default function Header({swapLogo}: {swapLogo: string}) {
    return <>
        <div>
            <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <img src={swapLogo} className="logo" alt="dynamic logo" />
            <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>
        <h1>Docker + Vite + React + TypeScript</h1>
    </>
}