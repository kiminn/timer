import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Buttons from './buttons';

const Timer = () => {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);

    // interval을 관리하기 위한 ID값 설정. 간격 ID는 랜더링에 사용되지 않으므로, Ref에 보관하고 수동 업데이트
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);
    // []빈 배열, 최초 한 번만 실행
    // 의존성 배열 없으면 랜더링 될때마다! 타이머 다시 세팅(그 전꺼 치우고)

    console.log(`증가되었습니다, ${count}`);
    // console.log에 찍히게 하기위해 뺐습니다.
    return (
        <>
            <h1>{count}</h1>
            <hr />
            <Buttons intervalRef={intervalRef} setCount={setCount} />
        </>
    );
};

export default Timer;
