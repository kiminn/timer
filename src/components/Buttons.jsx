const Buttons = ({ intervalRef, setCount }) => {
    const handleStart = () => {
        intervalRef.current = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
    };
    const handleStop = () => {
        clearInterval(intervalRef.current);
    };
    const handleReset = () => {
        setCount(0);
    };
    const handlePlusTen = () => {
        setCount((prev) => prev + 10);
    };
    const handlePlusThirty = () => {
        setCount((prev) => prev + 30);
    };
    return (
        <>
            <button onClick={handleStart}>시작</button>
            <button onClick={handleStop}>중지</button>
            <button onClick={handleReset}>리셋</button>
            <br />
            <button onClick={handlePlusTen}>+10</button>
            <button onClick={handlePlusThirty}>+30</button>
        </>
    );
};

export default Buttons;

/**
 * 간격ID값을 가져와서 중지할 수 있어요
 */
