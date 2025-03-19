import axios from "axios";
import { useCallback, useState } from "react";

export default function Secret() {
    const [secret, setSecret] = useState('');
    const axBack = axios.create({baseURL: import.meta.env.VITE_BACKEND});

    const getSecret = useCallback(() => {
        if (!secret) {
          // Req secret from backend and use setSecret()
          axBack.post('/secret', {name: 'SECRET'})
            .then(res => setSecret(res.data))
            .catch(err => console.error(err));
        } else {
          setSecret('');
        }
    }, [secret, setSecret, axBack]);

    return <span onClick={getSecret} className='secret'>{
        !secret ?
        'Click this text to attempt to retrieve a secret from the backend.' :
        `The secret is: ${secret} -- Click this text to reset the secret state variable.`
    }</span>
}