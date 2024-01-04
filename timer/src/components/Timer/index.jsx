import { useEffect } from 'react';
import { useState } from 'react';
import Buttons from './components/buttons';

const Timer = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <h1>{count}</h1>
            <Buttons />
        </>
    );
};

export default Timer;
