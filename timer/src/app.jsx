import { useRef, useState } from 'react';
import './app.css';
import Timer from './components/_Timer';

export function App() {
    const [isShow, setIsShow] = useState(false);
    let alertRef = useRef('');

    /*
     * 알림창은 화면상에 렌더되는 부분과 상관이 없기 때문에 ref를 써봤습니다
     */

    const handleShowBtn = () => {
        alertRef.current = 'Okay, Bye...🙁';
        if (!isShow) {
            alertRef.current = 'Tada!';
        }
        setIsShow((prev) => !prev);
        alert(alertRef.current);
    };

    return (
        <>
            <button onClick={handleShowBtn}>{isShow ? '버튼 숨기기' : '버튼 보이기'}</button>
            <div>
                {isShow && (
                    <>
                        <Timer />
                    </>
                )}
            </div>
        </>
    );
}

/*
    @요구사항: Tada! alert가 나옴과 동시에 마운트 되어야함.
    @todo: 나중에는 input으로 timer값을 받아봐도 좋을 거 같다.
    useEffect는 구성의 최상단 (Timer가 된다.)
    만약 마운트 됐을 때 실행하게하려면,
    버튼의 여부에 따라 useEffect가 마운트되니 옮겨야겠다.
 */
