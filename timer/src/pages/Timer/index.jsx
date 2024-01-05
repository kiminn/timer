import { useEffect, useRef } from 'react';
import { useState } from 'react';
import Buttons from './components/buttons';

const Timer = () => {
    const [count, setCount] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const intervalRef = useRef(null);
    let alertRef = useRef('');

    // setInterval을 관리하기 위한 ID값 설정. 간격 ID는 랜더링에 사용되지 않으므로, Ref에 보관하고 수동 업데이트
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

    /*
     * 알림창은 화면상에 렌더되는 부분과 상관이 없기 때문에 ref를 써봤습니다
     */
    const handleShowBtn = () => {
        alertRef.current = 'Tada!';
        if (isShow === true) {
            alertRef.current = 'Okay, Bye...🙁';
        }
        setIsShow((prev) => !prev);
        alert(alertRef.current);
    };

    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleShowBtn}>{isShow ? '버튼 숨기기' : '버튼 보이기'}</button>
            <div>
                {isShow && (
                    <>
                        <hr />
                        <Buttons setCount={setCount} />
                    </>
                )}
            </div>
        </>
    );
};

export default Timer;

/*
    @요구사항: Tada! alert가 나옴과 동시에 마운트 되어야함.
    @todo: 나중에는 input으로 timer값을 받아봐도 좋을 거 같다.
 */
