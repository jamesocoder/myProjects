export default function Env() {
    return <>
        <h2>Environment Variable Values</h2>
        <p>{'import.meta.env.DEV variable is ' + (import.meta.env.DEV ? 'true' : 'falsey')}</p>
        <p>{import.meta.env.VITE_HOST ?? 'HOST ENV variable not readable'}</p>
        <p>{import.meta.env.VITE_PORT ?? 'PORT ENV variable not readable'}</p>
    </>
}