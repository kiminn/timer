import { useEffect } from 'react';

const Buttons = ({ setCount }) => {
    const handleStart = () => {
    };

    return (
        <>
            <button onClick={handleStart}>시작</button>
            <button>중지</button>
            <button>리셋</button>
            <br />
            <button>+10</button>
            <button>+30</button>
        </>
    );
};

export default Buttons;
